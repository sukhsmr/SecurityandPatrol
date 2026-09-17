import ConnectedHeader from '@/components/Header/Connected';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
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
                    <article id="post-3" className="entry content-bg single-entry post-3 page type-page status-publish hentry">
                      <div className="entry-content-wrap">
                        <div className="entry-content single-content">
                          <div data-elementor-type="wp-page" data-elementor-id="3" className="elementor elementor-3" data-elementor-post-type="page">
                            <PrivacyPolicyContent />
                          </div>
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
