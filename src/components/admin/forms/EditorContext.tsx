'use client';

import { createContext, useContext } from 'react';

/**
 * Where the content being edited appears on the site, so the rich text editor
 * and its preview can wrap it in the same theme classes as the public page.
 */
export type EditorSurface =
  /** A page section; `elementorId` is the page's Elementor wrapper id (0 = none). */
  | { variant: 'page'; elementorId: number; articleClassName?: string; scope?: number }
  /** A blog post body. */
  | { variant: 'post' };

const EditorContext = createContext<EditorSurface>({ variant: 'page', elementorId: 0 });

export const EditorSurfaceProvider = EditorContext.Provider;

export function useEditorSurface(): EditorSurface {
  return useContext(EditorContext);
}
