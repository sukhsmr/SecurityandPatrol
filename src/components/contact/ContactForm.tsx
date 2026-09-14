export default function ContactForm() {
  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-081e0e0 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
      data-id="081e0e0"
      data-element_type="section"
      data-e-type="section"
      data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
    >
      <div className="elementor-container elementor-column-gap-default">
        {/* Left spacer column */}
        <div
          className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-47e0795"
          data-id="47e0795"
          data-element_type="column"
          data-e-type="column"
        >
          <div className="elementor-widget-wrap"></div>
        </div>

        {/* Main content column */}
        <div
          className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-bf52a29"
          data-id="bf52a29"
          data-element_type="column"
          data-e-type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            {/* Inner section: Form + Laptop Image */}
            <section
              className="elementor-section elementor-inner-section elementor-element elementor-element-86e3616 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="86e3616"
              data-element_type="section"
              data-e-type="section"
              data-settings='{"background_background":"classic"}'
            >
              <div className="elementor-container elementor-column-gap-default">
                {/* Form side */}
                <div
                  className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-b69f831"
                  data-id="b69f831"
                  data-element_type="column"
                  data-e-type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {/* "Get a free quote" heading */}
                    <div
                      className="elementor-element elementor-element-4d9e06f elementor-widget elementor-widget-heading"
                      data-id="4d9e06f"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="heading.default"
                    >
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Get a free quote
                        </h2>
                      </div>
                    </div>

                    {/* Subheading */}
                    <div
                      className="elementor-element elementor-element-2da045a elementor-widget elementor-widget-heading"
                      data-id="2da045a"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="heading.default"
                    >
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Our friendly team would love to hear from you.
                        </h2>
                      </div>
                    </div>

                    {/* Form */}
                    <div
                      className="elementor-element elementor-element-623f6a0 elementor-button-align-stretch elementor-widget elementor-widget-form"
                      data-id="623f6a0"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="form.default"
                    >
                      <div className="elementor-widget-container">
                        <form
                          className="elementor-form"
                          method="post"
                          name="New Form"
                          aria-label="New Form"
                        >
                          <input
                            type="hidden"
                            name="post_id"
                            value="9"
                          />
                          <input
                            type="hidden"
                            name="form_id"
                            value="623f6a0"
                          />
                          <input
                            type="hidden"
                            name="referer_title"
                            value="ADS Guards | Contact Us"
                          />
                          <input
                            type="hidden"
                            name="queried_id"
                            value="9"
                          />

                          <div className="elementor-form-fields-wrapper elementor-labels-above">
                            {/* First Name + Email row */}
                            <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-50">
                              <label
                                htmlFor="form-field-name"
                                className="elementor-field-label"
                              >
                                First name
                              </label>
                              <input
                                size={1}
                                type="text"
                                name="form_fields[name]"
                                id="form-field-name"
                                className="elementor-field elementor-size-sm elementor-field-textual"
                                placeholder="First name"
                              />
                            </div>

                            <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-field_986fac2 elementor-col-50">
                              <label
                                htmlFor="form-field-field_986fac2"
                                className="elementor-field-label"
                              >
                                Email
                              </label>
                              <input
                                size={1}
                                type="email"
                                name="form_fields[field_986fac2]"
                                id="form-field-field_986fac2"
                                className="elementor-field elementor-size-sm elementor-field-textual"
                                placeholder="Email@example.com"
                              />
                            </div>

                            {/* Select Service */}
                            <div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_944ce13 elementor-col-100">
                              <label
                                htmlFor="form-field-field_944ce13"
                                className="elementor-field-label"
                              >
                                Select service
                              </label>
                              <div className="elementor-field elementor-select-wrapper remove-before">
                                <div className="select-caret-down-wrapper">
                                  <i
                                    aria-hidden="true"
                                    className="eicon-caret-down"
                                  ></i>
                                </div>
                                <select
                                  name="form_fields[field_944ce13]"
                                  id="form-field-field_944ce13"
                                  className="elementor-field-textual elementor-size-sm"
                                >
                                  <option value="Armed Security">
                                    Armed Security
                                  </option>
                                  <option value="Unarmed Security">
                                    Unarmed Security
                                  </option>
                                  <option value="Construction site Security">
                                    Construction site Security
                                  </option>
                                  <option value="Mobile patrol Security">
                                    Mobile patrol Security
                                  </option>
                                  <option value="Commercial Security">
                                    Commercial Security
                                  </option>
                                  <option value="Residential Security">
                                    Residential Security
                                  </option>
                                </select>
                              </div>
                            </div>

                            {/* Your location */}
                            <div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_df9ab1a elementor-col-100">
                              <label
                                htmlFor="form-field-field_df9ab1a"
                                className="elementor-field-label"
                              >
                                Your location
                              </label>
                              <div className="elementor-field elementor-select-wrapper remove-before">
                                <div className="select-caret-down-wrapper">
                                  <i
                                    aria-hidden="true"
                                    className="eicon-caret-down"
                                  ></i>
                                </div>
                                <select
                                  name="form_fields[field_df9ab1a]"
                                  id="form-field-field_df9ab1a"
                                  className="elementor-field-textual elementor-size-sm"
                                >
                                  <option value="California (Bay Area)">
                                    California (Bay Area)
                                  </option>
                                  <option value="Portland Oregon">
                                    Portland Oregon
                                  </option>
                                  <option value="Seattle Washington">
                                    Seattle Washington
                                  </option>
                                  <option value="Vancouver Washington">
                                    Vancouver Washington
                                  </option>
                                  <option value="Houston Texas">
                                    Houston Texas
                                  </option>
                                  <option value="San Antonio Texas">
                                    San Antonio Texas
                                  </option>
                                </select>
                              </div>
                            </div>

                            {/* Phone number */}
                            <div className="elementor-field-type-number elementor-field-group elementor-column elementor-field-group-field_0362869 elementor-col-100">
                              <label
                                htmlFor="form-field-field_0362869"
                                className="elementor-field-label"
                              >
                                Phone number
                              </label>
                              <input
                                type="number"
                                name="form_fields[field_0362869]"
                                id="form-field-field_0362869"
                                className="elementor-field elementor-size-sm elementor-field-textual"
                              />
                            </div>

                            {/* Message */}
                            <div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-message elementor-col-100">
                              <label
                                htmlFor="form-field-message"
                                className="elementor-field-label"
                              >
                                Message
                              </label>
                              <textarea
                                className="elementor-field-textual elementor-field elementor-size-sm"
                                name="form_fields[message]"
                                id="form-field-message"
                                rows={4}
                                placeholder="Message"
                              ></textarea>
                            </div>

                            {/* Acceptance checkbox */}
                            <div className="elementor-field-type-acceptance elementor-field-group elementor-column elementor-field-group-field_e1d8d27 elementor-col-100">
                              <div className="elementor-field-subgroup">
                                <span className="elementor-field-option">
                                  <input
                                    type="checkbox"
                                    name="form_fields[field_e1d8d27]"
                                    id="form-field-field_e1d8d27"
                                    className="elementor-field elementor-size-sm elementor-acceptance-field"
                                  />
                                  <label htmlFor="form-field-field_e1d8d27">
                                    You agree to our friendly privacy policy.
                                  </label>
                                </span>
                              </div>
                            </div>

                            {/* reCAPTCHA placeholder */}
                            <div className="elementor-field-type-recaptcha elementor-field-group elementor-column elementor-field-group-field_44a1ea6 elementor-col-100">
                              <div
                                className="elementor-field"
                                id="form-field-field_44a1ea6"
                              >
                                <div
                                  className="elementor-g-recaptcha"
                                  data-sitekey="6LfBXe4kAAAAAF0M3DbCqRcEIcwuayRxvYhJ3ISJ"
                                  data-type="v2_checkbox"
                                  data-theme="light"
                                  data-size="normal"
                                ></div>
                              </div>
                            </div>

                            {/* Submit button */}
                            <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
                              <button
                                className="elementor-button elementor-size-sm"
                                type="submit"
                              >
                                <span className="elementor-button-content-wrapper">
                                  <span className="elementor-button-text">
                                    Send your message
                                  </span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Disclaimer text */}
                    <div
                      className="elementor-element elementor-element-6e07928 elementor-widget elementor-widget-text-editor"
                      data-id="6e07928"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="text-editor.default"
                    >
                      <div className="elementor-widget-container">
                        <p>
                          By providing a telephone number and submitting this
                          form you are consenting to be contacted by SMS text
                          message. Message &amp; data rates may apply. You can
                          reply STOP to opt-out of further messaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Image side */}
                <div
                  className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-57659e3"
                  data-id="57659e3"
                  data-element_type="column"
                  data-e-type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-bf7bb11 elementor-widget elementor-widget-image"
                      data-id="bf7bb11"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="image.default"
                    >
                      <div className="elementor-widget-container">
                        <img
                          src="https://www.adsguards.com/wp-content/uploads/2023/03/laptop.png"
                          decoding="async"
                          width="510"
                          height="697"
                          className="attachment-large size-large wp-image-1210"
                          alt="Person with laptop on lap, typing on keyboard with document on screen, sitting on gray faux fur rug."
                          srcSet="https://www.adsguards.com/wp-content/uploads/2023/03/laptop.png 510w, https://www.adsguards.com/wp-content/uploads/2023/03/laptop-220x300.png 220w"
                          sizes="(max-width: 510px) 100vw, 510px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right spacer column */}
        <div
          className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-6ba205d"
          data-id="6ba205d"
          data-element_type="column"
          data-e-type="column"
        >
          <div className="elementor-widget-wrap"></div>
        </div>
      </div>
    </section>
  );
}
