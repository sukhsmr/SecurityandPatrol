export default function ContactMap() {
  return (
    <>
      {/* ========================================================
          Section 1: "Contact us / WE'D LOVE TO HEAR FROM YOU"
          ======================================================== */}
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-5eab911 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="5eab911"
        data-element_type="section"
        data-e-type="section"
        data-settings='{"background_background":"classic"}'
      >
        <div className="elementor-container elementor-column-gap-default">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-74dd1a6"
            data-id="74dd1a6"
            data-element_type="column"
            data-e-type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              {/* "Contact us" small text */}
              <div
                className="elementor-element elementor-element-a3821b0 elementor-widget elementor-widget-heading"
                data-id="a3821b0"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    Contact us
                  </h2>
                </div>
              </div>

              {/* "WE'D LOVE TO HEAR FROM YOU" big heading */}
              <div
                className="elementor-element elementor-element-29ad81b elementor-widget elementor-widget-heading"
                data-id="29ad81b"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    WE&apos;D LOVE TO HEAR FROM YOU
                  </h2>
                </div>
              </div>

              {/* Subtext */}
              <div
                className="elementor-element elementor-element-d3b96ab elementor-widget elementor-widget-heading"
                data-id="d3b96ab"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    We have offices and teams all around the world.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          Section 2: World Map with Hotspots
          ======================================================== */}
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-847061f elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle"
        data-id="847061f"
        data-element_type="section"
        data-e-type="section"
        data-settings='{"background_background":"classic"}'
      >
        <div className="elementor-background-overlay"></div>
        <div className="elementor-container elementor-column-gap-no">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-207e3a09"
            data-id="207e3a09"
            data-element_type="column"
            data-e-type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              {/* Hotspot Map Widget */}
              <div
                className="elementor-element elementor-element-18a7a61 elementor-widget elementor-widget-hotspot"
                data-id="18a7a61"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="hotspot.default"
              >
                <div className="elementor-widget-container">
                  {/* World Map Image */}
                  <img
                    src="https://www.adsguards.com/wp-content/uploads/2023/03/Map-Ads-Guard.png"
                    decoding="async"
                    width="1024"
                    height="483"
                    className="attachment-large size-large wp-image-1340"
                    alt="Dotted world map on a dark background, highlighting global connectivity and geography."
                    style={{ width: "100%", height: "auto" }}
                  />

                  {/* Hotspot: Seattle Washington */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-299e8f2 e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "15%", top: "30%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>Seattle Washington</h5>
                      <p style={{ textAlign: "center" }}>
                        Branch Office
                        <br />
                        600 Stewart St Suite
                        <br />
                        400 Seattle, WA 98101
                      </p>
                    </div>
                  </div> */}

                  {/* Hotspot: Vancouver Washington */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-7e4cd5c e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "16%", top: "35%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>
                        Vancouver, Washington
                      </h5>
                      <p style={{ textAlign: "center" }}>
                        Branch Office
                        <br />
                        600 Stewart St Suite
                        <br />
                        400 Seattle, WA 98101
                      </p>
                    </div>
                  </div> */}

                  {/* Hotspot: Portland Oregon */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-ad5a931 e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "16%", top: "40%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>Portland Oregon</h5>
                      <p style={{ textAlign: "center" }}>
                        Corporate Office
                        <br />
                        33446 Western AVE
                        <br />
                        Union City, CA 94587
                      </p>
                    </div>
                  </div> */}

                  {/* Hotspot: California Bay Area */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-38069af e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "17%", top: "45%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>
                        <strong>California (Bay Area)</strong>
                      </h5>
                      <p style={{ textAlign: "center" }}>
                        Headquarter
                        <br />
                        33446 Western AVE Union City
                        <br />
                        CA 94587
                      </p>
                    </div>
                  </div> */}

                  {/* Hotspot: Houston Texas */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-ef9ecdb e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "25%", top: "47%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>Houston Texas</h5>
                      <p style={{ textAlign: "center" }}>
                        Branch Office
                        <br />
                        7400 Harwin Dr Suite 283,
                        <br />
                        Houston, TX 77036
                      </p>
                    </div>
                  </div> */}

                  {/* Hotspot: San Antonio Texas */}
                  {/* <div
                    className="e-hotspot elementor-repeater-item-e0623cb e-hotspot--position-left e-hotspot--position-top e-hotspot--circle"
                    style={{ left: "22%", top: "45%" }}
                  >
                    <div className="e-hotspot__button e-hotspot--expand">
                      <div className="e-hotspot__outer-circle"></div>
                      <div className="e-hotspot__inner-circle"></div>
                    </div>
                    <div className="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out">
                      <h5 style={{ textAlign: "center" }}>San Antonio Texas</h5>
                      <p style={{ textAlign: "center" }}>
                        Branch Office
                        <br />
                        1100 NW Loop 410 San
                        <br />
                        Antonio, Tx 78213
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Contact info columns below the map */}
              <section
                className="elementor-section elementor-inner-section elementor-element elementor-element-fc6aae1 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                data-id="fc6aae1"
                data-element_type="section"
                data-e-type="section"
                data-settings='{"background_background":"classic"}'
              >
                <div className="elementor-container elementor-column-gap-default">
                  {/* Career HR */}
                  <div
                    className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-db932be"
                    data-id="db932be"
                    data-element_type="column"
                    data-e-type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className="elementor-element elementor-element-b6a159f elementor-widget elementor-widget-heading"
                        data-id="b6a159f"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Career (HR)
                          </h2>
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-6d7c40b elementor-widget elementor-widget-heading"
                        data-id="6d7c40b"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            hr@adsguards.com
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Get a Quote (Sale) */}
                  <div
                    className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-487ded0"
                    data-id="487ded0"
                    data-element_type="column"
                    data-e-type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className="elementor-element elementor-element-f8ca158 elementor-widget elementor-widget-heading"
                        data-id="f8ca158"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Get a Quote (Sale)
                          </h2>
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-ceeea24 elementor-widget elementor-widget-heading"
                        data-id="ceeea24"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Questions or Queries? Get in touch!
                          </h2>
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-74c27b8 elementor-widget elementor-widget-heading"
                        data-id="74c27b8"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Sales@adsguards.com, mjalala@adsguards.com,
                            Hamid.shukur@adsguards.com
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subscription info */}
                  <div
                    className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-12a0a98"
                    data-id="12a0a98"
                    data-element_type="column"
                    data-e-type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className="elementor-element elementor-element-fe89075 elementor-widget elementor-widget-heading"
                        data-id="fe89075"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Subscription (info)
                          </h2>
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-a76bd09 elementor-widget elementor-widget-heading"
                        data-id="a76bd09"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Info@adsguards.com
                          </h2>
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-26d5a1c elementor-widget elementor-widget-heading"
                        data-id="26d5a1c"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Hamid.shukur@adsguards.com
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
