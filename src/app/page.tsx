import ConnectedHeader from '@/components/Header/Connected';
import Hero from '@/components/Hero';
import Tracking from '@/components/Tracking';
import WhyChoose from '@/components/WhyChoose';
import ServicesIntro from '@/components/ServicesIntro';
import ServicesList from '@/components/ServicesList';
import WhyChooseUs from '@/components/WhyChooseUs';
import OfficesIntro from '@/components/OfficesIntro';
import OfficesList from '@/components/OfficesList';
import Testimonials from '@/components/Testimonials';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import { getAllOffices } from '@/lib/data/offices';
import { getServicesBySlugs } from '@/lib/data/services';

export const revalidate = 0;

const HOME_FEATURED_SERVICE_SLUGS = [
  'unarmed-security',
  'armed-security',
  'construction-site-security',
  'mobile-patrol-security',
  'event-security',
  'commercial-security',
];

export default async function Home() {
  const [offices, featuredServices] = await Promise.all([
    getAllOffices(),
    getServicesBySlugs(HOME_FEATURED_SERVICE_SLUGS),
  ]);
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
                    <article id="post-7" className="entry content-bg single-entry post-7 page type-page status-publish has-post-thumbnail hentry">
                      <div className="entry-content-wrap">
                        <div className="entry-content single-content">
                          <div data-elementor-type="wp-page" data-elementor-id="7" className="elementor elementor-7" data-elementor-post-type="page">
                            <Hero />
                            <Tracking />
                            <WhyChoose />
                            <ServicesIntro />
                            <ServicesList services={featuredServices} />
                            <WhyChooseUs />
                            <OfficesIntro />
                            <OfficesList offices={offices} />
                            <Testimonials />
                            {/* <ContactUs /> */}
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
