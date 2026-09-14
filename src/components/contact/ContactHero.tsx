export default function ContactHero() {
  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-899c573 elementor-section-stretched elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="899c573"
      data-element_type="section"
      data-e-type="section"
      data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
    >
      <div className="elementor-background-overlay"></div>
      <div className="elementor-container elementor-column-gap-default">
        {/* Left column - CONTACT US text + Call Now button */}
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-53c13bf"
          data-id="53c13bf"
          data-element_type="column"
          data-e-type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            {/* Heading: CONTACT US */}
            <div
              className="elementor-element elementor-element-02a511b elementor-widget elementor-widget-heading"
              data-id="02a511b"
              data-element_type="widget"
              data-e-type="widget"
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  <br />
                  CONTACT
                  <br />
                  <span style={{ color: "#ee8e09", fontSize: "72px" }}>US</span>
                </h2>
              </div>
            </div>

            {/* Inner section: Call now button + phone number */}
            <section
              className="elementor-section elementor-inner-section elementor-element elementor-element-e33f82b elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="e33f82b"
              data-element_type="section"
              data-e-type="section"
              data-settings='{"background_background":"classic"}'
            >
              <div className="elementor-container elementor-column-gap-no">
                {/* Call now button */}
                <div
                  className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-94b4b3e"
                  data-id="94b4b3e"
                  data-element_type="column"
                  data-e-type="column"
                  data-settings='{"background_background":"classic"}'
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-4cab460 elementor-widget elementor-widget-button"
                      data-id="4cab460"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="button.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <a
                            className="elementor-button elementor-button-link elementor-size-sm"
                            href="tel:18007941550"
                          >
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Call now
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone number */}
                <div
                  className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-948a1d6"
                  data-id="948a1d6"
                  data-element_type="column"
                  data-e-type="column"
                  data-settings='{"background_background":"classic"}'
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-3da1c7a elementor-widget elementor-widget-heading"
                      data-id="3da1c7a"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="heading.default"
                    >
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          1-800-794-1550
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right column - empty (for background phone image) */}
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-b8c1eaf"
          data-id="b8c1eaf"
          data-element_type="column"
          data-e-type="column"
        >
          <div className="elementor-widget-wrap"></div>
        </div>
      </div>
    </section>
  );
}
