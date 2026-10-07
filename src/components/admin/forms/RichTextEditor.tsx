'use client';

import 'jodit/es2021/jodit.min.css';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Jodit as JoditEditor } from 'jodit/esm/index.js';
import type { IJodit } from 'jodit/esm/types';
import { SITE_BODY_CLASSES } from '@/components/site/bodyClasses';
import { EDITOR_STYLESHEET } from '@/components/site/siteStylesheet';
import MediaPickerModal from '../media/MediaPickerModal';
import Spinner from '../ui/Spinner';
import { useEditorSurface, type EditorSurface } from './EditorContext';

/**
 * Rich text editor for HTML content (service-page sections, blog posts,
 * policy text). Three views of the same HTML:
 *
 * - Visual: WYSIWYG (Jodit) inside an iframe that loads the website's own
 *   stylesheets, so headings, paragraphs, lists and links look exactly as on
 *   the site. Images can be uploaded or picked from the media library.
 * - HTML: the raw markup.
 * - Preview: the content as the public page renders it, at desktop, tablet
 *   or mobile width.
 *
 * The editor never rewrites content on its own: the value only changes when
 * the admin edits it.
 */

type View = 'visual' | 'html' | 'preview';

interface RichTextEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  /** Visual editor height in px. */
  height?: number;
}

/** Theme classes the content sits in on the public site, flattened onto the editor's <body>. */
function surfaceClasses(surface: EditorSurface): string {
  if (surface.variant === 'post') return `${SITE_BODY_CLASSES} single-content cms-surface-post`;
  const scopes = [surface.elementorId, surface.scope].filter((id, index, all): id is number => !!id && all.indexOf(id) === index);
  return [
    SITE_BODY_CLASSES,
    'site-container entry-content-wrap entry-content single-content',
    surface.articleClassName ?? '',
    scopes.length ? `elementor ${scopes.map((id) => `elementor-${id}`).join(' ')}` : '',
    'cms-surface-page',
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Styles that make hidden-until-JavaScript content editable, plus the blog post body layout. */
const EDITOR_FIXES = `
html{margin:0;padding:0;min-height:100%;background:#fff}
body{margin:0;min-height:100%;outline:none;overflow:auto;background:#fff}
body.cms-surface-page{padding:12px 16px}
body.cms-surface-post{max-width:800px;margin:0 auto;padding:24px 20px;font-size:18px;line-height:1.8;color:#333;overflow-wrap:break-word}
.elementor-invisible{visibility:visible!important}
.elementor-tab-content{display:block!important}
.jodit-wysiwyg_image-selected::selection,.jodit-wysiwyg_image-selected *:not(img)::selection{background:transparent}
img{max-width:100%;height:auto}
`;

/** Full HTML document reproducing the public page around the content (for the Preview tab). */
function previewDocument(html: string, surface: EditorSurface): string {
  const scripts = /<script\b[^>]*>[\s\S]*?<\/script>/gi; // never run content scripts in the preview
  const content = html.replace(scripts, '');
  let body: string;
  if (surface.variant === 'post') {
    body = `<div style="background-color:#fff;padding:60px 0"><article style="max-width:800px;margin:0 auto;padding:0 20px;width:100%"><div class="single-content" style="font-size:18px;line-height:1.8;color:#333;width:100%;overflow-wrap:break-word">${content}</div></article></div>`;
  } else {
    let inner = content;
    if (surface.scope && surface.scope !== surface.elementorId) inner = `<div class="elementor elementor-${surface.scope}">${inner}</div>`;
    if (surface.elementorId) inner = `<div class="elementor elementor-${surface.elementorId}">${inner}</div>`;
    body =
      `<div id="wrapper" class="site wp-site-blocks"><div id="content" class="site-content"><main id="inner-wrap" class="wrap kt-clear">` +
      `<div id="primary" class="content-area"><div class="content-container site-container"><div id="main" class="site-main"><div class="content-wrap">` +
      `<article class="${surface.articleClassName ?? 'entry single-entry'}"><div class="entry-content-wrap"><div class="entry-content single-content">${inner}</div></div></article>` +
      `</div></div></div></div></main></div></div>`;
  }
  return (
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<base href="${typeof window === 'undefined' ? '/' : `${window.location.origin}/`}" target="_blank">` +
    `<link rel="stylesheet" href="${EDITOR_STYLESHEET}"><style>.elementor-invisible{visibility:visible!important}</style></head>` +
    `<body class="${SITE_BODY_CLASSES}">${body}</body></html>`
  );
}

interface UploadResponse {
  item?: { path: string };
  error?: string;
}

function VisualEditor({ value, onChange, height, surface, onReady }: { value: string; onChange: (value: string) => void; height: number; surface: EditorSurface; onReady: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<IJodit | null>(null);
  const [picking, setPicking] = useState(false);
  // Latest callbacks without re-creating the editor.
  const onChangeRef = useRef(onChange);
  const onReadyRef = useRef(onReady);
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    onChangeRef.current = onChange;
    onReadyRef.current = onReady;
    valueRef.current = value;
  });
  const bodyClasses = surfaceClasses(surface);

  useEffect(() => {
    let cancelled = false;
    let editor: IJodit | null = null;
    // The editor is loaded with the value at creation; later changes come from the editor itself.
    const original = valueRef.current;
    const host = document.createElement('div');
    hostRef.current?.appendChild(host);

    (async () => {
      const [{ Jodit }] = await Promise.all([import('jodit/esm/index.js') as Promise<{ Jodit: typeof JoditEditor }>, import('jodit/esm/plugins/all.js')]);
      if (cancelled) return;

      editor = Jodit.make(host, {
        iframe: true,
        iframeBaseUrl: `${window.location.origin}/`,
        iframeCSSLinks: [EDITOR_STYLESHEET],
        iframeStyle: EDITOR_FIXES,
        iframeTitle: 'Content editor',
        height,
        minHeight: 320,
        allowResizeX: false,
        allowResizeY: true,
        toolbarAdaptive: false,
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: true,
        askBeforePasteFromWord: true,
        askBeforePasteHTML: false,
        defaultActionOnPaste: 'insert_clear_html',
        imageDefaultWidth: null,
        // Content is stored exactly as written; don't "tidy" Elementor markup.
        cleanHTML: {
          removeEmptyElements: false,
          fillEmptyParagraph: false,
          replaceNBSP: false,
          replaceOldTags: false,
          denyTags: 'object,embed',
          removeOnError: false,
          safeLinksTarget: false,
          sandboxIframesInContent: false,
        },
        beautifyHTML: false,
        sourceEditor: 'area',
        disablePlugins: ['speech-recognize', 'ai-assistant', 'powered-by-jodit', 'stat', 'file', 'about', 'print'],
        uploader: {
          url: '/api/media/',
          insertImageAsBase64URI: false,
          withCredentials: true,
          filesVariableName: () => 'file',
          isSuccess: (resp: UploadResponse) => Boolean(resp.item?.path),
          getMessage: (resp: UploadResponse) => resp.error ?? '',
          process: (resp: UploadResponse) => ({ files: resp.item ? [resp.item.path] : [], isImages: [true], baseurl: '', path: '', error: 0, msg: resp.error ?? '' }),
        },
        link: { processVideoLink: true, noFollowCheckbox: true, openInNewTabCheckbox: true },
        buttons: [
          'paragraph', 'bold', 'italic', 'underline', 'strikethrough', '|',
          'ul', 'ol', 'outdent', 'indent', 'align', '|',
          'font', 'fontsize', 'brush', 'lineHeight', '|',
          'image',
          {
            name: 'mediaLibrary',
            icon: 'folder',
            tooltip: 'Insert image from media library',
            exec: (jodit: IJodit) => {
              jodit.s.save();
              if (jodit.isFullSize) jodit.toggleFullSize(false);
              setPicking(true);
            },
          },
          'link', 'video', 'table', 'hr', 'symbols', '|',
          'superscript', 'subscript', 'copyformat', 'eraser', '|',
          'undo', 'redo', 'find', 'selectall', 'fullsize',
        ],
      } as unknown as Parameters<typeof Jodit.make>[1]);

      editor.value = original;
      editor.editor.className = `${editor.editor.className} ${bodyClasses}`;
      editorRef.current = editor;
      // Jodit's serialisation can differ from the stored HTML (attribute
      // order, entities). Only report real edits; undoing back to the start
      // restores the exact original string.
      const baseline = editor.value;
      editor.events.on('change', (next: string) => {
        onChangeRef.current(next === baseline ? original : next);
      });
      onReadyRef.current();
    })();

    return () => {
      cancelled = true;
      editorRef.current = null;
      editor?.destruct();
      host.remove();
    };
    // Re-created only when the theme context changes.
  }, [bodyClasses, height]);

  return (
    <>
      <div ref={hostRef} className="cms-rte-visual" />
      <MediaPickerModal
        open={picking}
        title="Insert image"
        confirmText="Insert image"
        onClose={() => setPicking(false)}
        onPick={(src) => {
          const editor = editorRef.current;
          if (!editor) return;
          editor.s.restore();
          editor.s.insertImage(src, null, null);
        }}
      />
    </>
  );
}

const DEVICES = [
  { key: 'desktop', label: 'Desktop', width: 1366 },
  { key: 'tablet', label: 'Tablet', width: 820 },
  { key: 'mobile', label: 'Mobile', width: 390 },
] as const;

function Preview({ value, surface }: { value: string; surface: EditorSurface }) {
  const [device, setDevice] = useState<(typeof DEVICES)[number]['key']>('desktop');
  const [available, setAvailable] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const width = DEVICES.find((d) => d.key === device)!.width;
  const height = 720;

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = available ? Math.min(1, available / width) : 1;

  return (
    <div className="cms-rte-preview">
      <div className="cms-rte-devices" role="group" aria-label="Preview width">
        {DEVICES.map((d) => (
          <button key={d.key} type="button" className={`cms-btn cms-btn-sm${device === d.key ? ' cms-btn-primary' : ''}`} onClick={() => setDevice(d.key)} aria-pressed={device === d.key}>
            {d.label} <span className="cms-rte-device-width">{d.width}px</span>
          </button>
        ))}
      </div>
      <div ref={frameRef} className="cms-rte-frame" style={{ height: height * scale }}>
        <iframe
          title="Content preview"
          sandbox="allow-same-origin allow-popups"
          srcDoc={previewDocument(value, surface)}
          style={{ width, height, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

export default function RichTextEditor({ id, value, onChange, height = 560 }: RichTextEditorProps) {
  const surface = useEditorSurface();
  const [view, setView] = useState<View>('visual');
  const [ready, setReady] = useState(false);

  const tabs: Array<{ key: View; label: string }> = [
    { key: 'visual', label: 'Visual editor' },
    { key: 'html', label: 'HTML' },
    { key: 'preview', label: 'Preview' },
  ];

  return (
    <div className="cms-rte">
      <div className="cms-rte-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={view === tab.key}
            className={`cms-rte-tab${view === tab.key ? ' active' : ''}`}
            onClick={() => {
              if (tab.key !== 'visual') setReady(false);
              setView(tab.key);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {view === 'visual' && (
        <div className="cms-rte-body">
          {!ready && (
            <div className="cms-rte-loading">
              <Spinner /> Loading editor…
            </div>
          )}
          <VisualEditor value={value} onChange={onChange} height={height} surface={surface} onReady={() => setReady(true)} />
        </div>
      )}
      {view === 'html' && (
        <textarea id={id} className="cms-textarea is-code cms-rte-source" value={value} onChange={(event) => onChange(event.target.value)} spellCheck={false} style={{ height }} />
      )}
      {view === 'preview' && <Preview value={value} surface={surface} />}
    </div>
  );
}
