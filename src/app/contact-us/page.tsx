import ContactHero from "@/components/contact/ContactHero";
import ContactMap from "@/components/contact/ContactMap";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | ADS Guards",
  description:
    "Contact ADS Guards for 24/7 professional security services tailored to your needs.",
};

export default function ContactUsPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/css_contact_page.css" />
      <link rel="stylesheet" href="/css/css_contact_e9.css" />
      <main
        id="inner-wrap"
        className="wrap kt-clear"
        role="main"
      >
        <div id="primary" className="content-area">
          <div className="content-container site-container">
            <div id="main" className="site-main">
              <div className="content-wrap">
                <article className="entry content-bg single-entry page type-page status-publish has-post-thumbnail hentry">
                  <div className="entry-content-wrap">
                    <div className="entry-content single-content">
                      <div
                        data-elementor-type="wp-page"
                        data-elementor-id="9"
                        className="elementor elementor-9"
                        data-elementor-post-type="page"
                      >
                        <ContactHero />
                        <ContactMap />
                        <ContactForm />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
