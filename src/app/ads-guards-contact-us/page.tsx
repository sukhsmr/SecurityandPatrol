import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import ElementorRawView from '@/components/ElementorRawView';
import { getPageBySlug } from '@/lib/data/pages';

export const revalidate = 0;

export default async function ContactUsPage() {
  const contactData = await getPageBySlug('ads-guards-contact-us');
  return (
    <>
      <div id="wrapper" className="site wp-site-blocks">
        <a className="skip-link screen-reader-text scroll-ignore" href="#main">Skip to content</a>
        <ConnectedHeader />
        <div id="content" className="site-content">
          <main id="inner-wrap" className="wrap kt-clear" role="main">
            <div id="primary" className="content-area">
              <div className="content-container site-container">
                <div id="main" className="site-main">
                  <div className="content-wrap">
                    <article id="post-9" className="entry content-bg single-entry post-9 page type-page status-publish has-post-thumbnail hentry">
                      <div className="entry-content-wrap">
                        <div className="entry-content single-content">
                          <ElementorRawView contentHtml={contactData?.contentHtml || ''} />
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
