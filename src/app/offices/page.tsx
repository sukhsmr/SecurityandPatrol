import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import Offices from '@/components/Offices';
import { getAllOffices } from '@/lib/data/offices';

export default async function OfficesPage() {
  const offices = await getAllOffices();
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
                    <article id="post-966" className="entry single-entry post-966 page type-page status-publish hentry">
                      <div className="entry-content-wrap">
                        <div className="entry-content single-content">
                          <Offices offices={offices} />
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
