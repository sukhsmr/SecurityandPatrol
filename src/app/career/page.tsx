'use client';
import React, { useState } from 'react';
import { Metadata } from 'next';

export default function CareerPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== CAREER PAGE CSS (elementor-10) - from source ===== */

        /* Hero Section */
        .elementor-10 .elementor-element.elementor-element-3159fea > .elementor-container > .elementor-column > .elementor-widget-wrap {
          align-content: flex-start;
          align-items: flex-start;
        }
        .elementor-10 .elementor-element.elementor-element-3159fea:not(.elementor-motion-effects-element-type-background) {
          background-color: #161616;
          background-image: url(/wp-content/uploads/2023/03/Untitled-design-4.png);
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .elementor-10 .elementor-element.elementor-element-3159fea > .elementor-background-overlay {
          opacity: 0.5;
          background-color: #161616;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .elementor-10 .elementor-element.elementor-element-3159fea {
          padding: 100px 0 200px 0;
          position: relative;
          overflow: hidden;
        }
        .elementor-10 .elementor-element.elementor-element-1c202d0.elementor-column.elementor-element[data-element_type="column"] > .elementor-widget-wrap.elementor-element-populated {
          align-content: flex-start;
          align-items: flex-start;
        }
        .elementor-10 .elementor-element.elementor-element-1c202d0 > .elementor-element-populated {
          margin: 0 0 0 0;
          padding: 0 0 0 0;
        }
        .elementor-10 .elementor-element.elementor-element-4ef7bcc .elementor-heading-title {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 60px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #fff;
          line-height: 1;
        }
        .elementor-10 .elementor-element.elementor-element-a1b04c6 .elementor-button {
          background-color: #ee8e09;
          font-family: "Roboto", Sans-serif;
          font-size: 16px;
          font-weight: 500;
          fill: #fff;
          color: #fff;
          border-radius: 0 0 0 0;
          padding: 1em 3em 1em 3em;
          display: inline-block;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }
        .elementor-10 .elementor-element.elementor-element-a1b04c6 .elementor-button:hover {
          opacity: 0.9;
        }

        /* Form Section */
        .elementor-10 .elementor-element.elementor-element-c30d9e2:not(.elementor-motion-effects-element-type-background) {
          background-image: url(https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png);
          background-color: #161616;
        }
        .elementor-10 .elementor-element.elementor-element-c30d9e2 {
          padding: 50px 0 0 0;
        }
        .elementor-10 .elementor-element.elementor-element-35f0fc8 > .elementor-widget-container {
          padding: 0rem 0rem 0rem 0rem;
        }
        .elementor-10 .elementor-element.elementor-element-35f0fc8 {
          text-align: center;
        }
        .elementor-10 .elementor-element.elementor-element-35f0fc8 .elementor-heading-title {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #9ca3af;
        }
        .elementor-10 .elementor-element.elementor-element-ec541a7 {
          text-align: center;
        }
        .elementor-10 .elementor-element.elementor-element-ec541a7 .elementor-heading-title {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
        }

        /* Form inner (white box centered) */
        .career-form-outer {
          background-color: #161616;
          background-image: url(https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png);
          padding: 0 0 80px 0;
        }
        .career-form-inner {
          background-color: #fff;
          max-width: 700px;
          margin: 0 auto;
          padding: 30px 30px 24px;
        }

        /* Elementor form field styles */
        .elementor-form .elementor-form-fields-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
        }
        .elementor-form .elementor-field-group {
          padding: 5px 5px;
          flex-grow: 1;
        }
        .elementor-form .elementor-col-100 { width: 100%; }
        .elementor-form .elementor-col-50 { width: 50%; }
        .elementor-form .elementor-col-33 { width: 33.333%; }
        .elementor-form .elementor-col-66 { width: 66.666%; }
        .elementor-form .elementor-col-25 { width: 25%; }
        .elementor-form .elementor-col-75 { width: 75%; }

        .elementor-form .elementor-field-label {
          display: block;
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }
        .elementor-form .elementor-mark-required .elementor-field-label::after {
          content: " *";
          color: #d30c5c;
        }
        .elementor-form input[type="text"],
        .elementor-form input[type="email"],
        .elementor-form input[type="tel"],
        .elementor-form textarea {
          width: 100%;
          border: 1px solid #ccc;
          padding: 8px 10px;
          font-size: 13px;
          font-family: "Plus Jakarta Sans", Sans-serif;
          outline: none;
          background-color: #fff;
          color: #333;
          border-radius: 0;
          box-sizing: border-box;
        }
        .elementor-form input[type="text"]:focus,
        .elementor-form input[type="email"]:focus,
        .elementor-form input[type="tel"]:focus,
        .elementor-form textarea:focus {
          border-color: #ee8e09;
        }
        .elementor-form input[type="file"] {
          font-size: 13px;
          font-family: "Plus Jakarta Sans", Sans-serif;
        }
        .elementor-form .elementor-field-subgroup {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          padding: 8px 0;
        }
        .elementor-form .elementor-field-option {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 13px;
          color: #333;
        }
        .elementor-form .elementor-field-option input[type="radio"] {
          accent-color: #ee8e09;
          width: 15px;
          height: 15px;
        }
        .elementor-form .elementor-field-option label {
          cursor: pointer;
          font-size: 13px;
          font-family: "Plus Jakarta Sans", Sans-serif;
        }
        .elementor-form .e-form__buttons {
          padding-top: 8px;
        }
        .elementor-form .elementor-button[type="submit"] {
          width: 100%;
          background-color: #000;
          color: #fff;
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 12px 0;
          border: none;
          cursor: pointer;
          letter-spacing: 0.5px;
        }
        .elementor-form .elementor-button[type="submit"]:hover {
          background-color: #222;
        }
        .career-sms-notice {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 11px;
          color: #888;
          text-align: center;
          margin-top: 12px;
          font-style: italic;
          padding: 0 10px;
        }

        /* Career selected heading */
        .career-selected-heading {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #888;
          margin-bottom: 6px;
        }

        @media (max-width: 767px) {
          .elementor-10 .elementor-element.elementor-element-3159fea {
            padding: 100px 10px 100px 10px;
          }
          .elementor-form .elementor-col-33,
          .elementor-form .elementor-col-50 {
            width: 100%;
          }
          .career-form-inner {
            padding: 20px 15px;
          }
        }
      `}} />

      <div className="elementor-10">
        <div data-elementor-type="wp-page" data-elementor-id="10" className="elementor elementor-10" data-elementor-post-type="page">

          {/* ====== SECTION 1: Hero Banner ====== */}
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-3159fea elementor-section-stretched elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="3159fea"
            data-element_type="section"
            data-e-type="section"
          >
            <div className="elementor-background-overlay"></div>
            <div className="elementor-container elementor-column-gap-no">
              <div
                className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1c202d0"
                data-id="1c202d0"
                data-element_type="column"
                data-e-type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* Heading */}
                  <div
                    className="elementor-element elementor-element-4ef7bcc elementor-widget elementor-widget-heading"
                    data-id="4ef7bcc"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">
                        <br />
                        THE BEST WAY TO START<br /><span style={{ color: '#ee8e09', fontSize: '72px' }}>YOUR CAREER</span>
                      </h2>
                    </div>
                  </div>
                  {/* Button */}
                  <div
                    className="elementor-element elementor-element-a1b04c6 elementor-widget elementor-widget-button"
                    data-id="a1b04c6"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="button.default"
                  >
                    <div className="elementor-widget-container">
                      <div className="elementor-button-wrapper">
                        <a
                          className="elementor-button elementor-button-link elementor-size-sm"
                          href="/contact-us"
                        >
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-text">CONTACT US NOW</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right column - empty in source */}
              <div
                className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6fe4322"
                data-id="6fe4322"
                data-element_type="column"
                data-e-type="column"
              >
                <div className="elementor-widget-wrap"></div>
              </div>
            </div>
          </section>

          {/* ====== SECTION 2: Career Title + Divider ====== */}
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-c30d9e2 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="c30d9e2"
            data-element_type="section"
            data-e-type="section"
            data-settings='{"background_background":"classic"}'
          >
            <div className="elementor-container elementor-column-gap-default">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-bcf1973"
                data-id="bcf1973"
                data-element_type="column"
                data-e-type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* "Career" small label */}
                  <div
                    className="elementor-element elementor-element-35f0fc8 elementor-widget elementor-widget-heading"
                    data-id="35f0fc8"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Career</h2>
                    </div>
                  </div>
                  {/* "Choose the career..." heading */}
                  <div
                    className="elementor-element elementor-element-ec541a7 elementor-widget elementor-widget-heading"
                    data-id="ec541a7"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Choose the career that suit you best</h2>
                    </div>
                  </div>
                  {/* Divider */}
                  <div
                    className="elementor-element elementor-element-315efc9 elementor-widget-divider--view-line elementor-widget elementor-widget-divider"
                    data-id="315efc9"
                    data-element_type="widget"
                    data-e-type="widget"
                    data-widget_type="divider.default"
                  >
                    <div className="elementor-widget-container">
                      <div className="elementor-divider">
                        <span className="elementor-divider-separator"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== SECTION 3: Career Form ====== */}
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-1d262a3 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default career-form-outer"
            data-id="1d262a3"
            data-element_type="section"
            data-e-type="section"
            data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
          >
            <div className="elementor-container elementor-column-gap-default">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-f1f2402"
                data-id="f1f2402"
                data-element_type="column"
                data-e-type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  <section
                    className="elementor-section elementor-inner-section elementor-element elementor-element-c853b94 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="c853b94"
                    data-element_type="section"
                    data-e-type="section"
                  >
                    <div className="elementor-container elementor-column-gap-default">
                      {/* Left spacer */}
                      <div
                        className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-fec6347"
                        data-id="fec6347"
                        data-element_type="column"
                        data-e-type="column"
                      >
                        <div className="elementor-widget-wrap"></div>
                      </div>

                      {/* Center: form */}
                      <div
                        className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-c6d7239"
                        data-id="c6d7239"
                        data-element_type="column"
                        data-e-type="column"
                        data-settings='{"background_background":"classic"}'
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          {/* Career selected heading */}
                          <div
                            className="elementor-element elementor-element-0d49c0c elementor-widget elementor-widget-heading"
                            data-id="0d49c0c"
                            data-element_type="widget"
                            data-e-type="widget"
                            data-widget_type="heading.default"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default career-selected-heading">Career selected</h2>
                            </div>
                          </div>

                          {/* Form */}
                          <div
                            className="elementor-element elementor-element-df42ce0 elementor-button-align-stretch elementor-widget elementor-widget-form"
                            data-id="df42ce0"
                            data-element_type="widget"
                            data-e-type="widget"
                            data-widget_type="form.default"
                          >
                            <div className="elementor-widget-container">
                              <div className="career-form-inner">
                                <form className="elementor-form" method="post" name="New Form" aria-label="New Form" onSubmit={(e) => e.preventDefault()}>
                                  <div className="elementor-form-fields-wrapper elementor-labels-above">
                                    {/* Radio */}
                                    <div className="elementor-field-type-radio elementor-field-group elementor-column elementor-field-group-field_cdac32c elementor-col-100">
                                      <div className="elementor-field-subgroup elementor-subgroup-inline">
                                        <span className="elementor-field-option">
                                          <input type="radio" value="Administration" id="form-field-field_cdac32c-0" name="form_fields[field_cdac32c]" defaultChecked />
                                          <label htmlFor="form-field-field_cdac32c-0">Administration</label>
                                        </span>
                                        <span className="elementor-field-option">
                                          <input type="radio" value="Security guard application" id="form-field-field_cdac32c-1" name="form_fields[field_cdac32c]" />
                                          <label htmlFor="form-field-field_cdac32c-1">Security guard application</label>
                                        </span>
                                        <span className="elementor-field-option">
                                          <input type="radio" value="Patrol / Supervisor" id="form-field-field_cdac32c-2" name="form_fields[field_cdac32c]" />
                                          <label htmlFor="form-field-field_cdac32c-2">Patrol / Supervisor</label>
                                        </span>
                                      </div>
                                    </div>

                                    {/* First Name */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-33 elementor-field-required elementor-mark-required">
                                      <label htmlFor="form-field-name" className="elementor-field-label">First Name</label>
                                      <input size={1} type="text" name="form_fields[name]" id="form-field-name" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="First Name" required />
                                    </div>

                                    {/* Middle Name */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_80f79e9 elementor-col-33">
                                      <label htmlFor="form-field-field_80f79e9" className="elementor-field-label">Middle Name</label>
                                      <input size={1} type="text" name="form_fields[field_80f79e9]" id="form-field-field_80f79e9" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Middle Name" />
                                    </div>

                                    {/* Last Name */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_94a11f9 elementor-col-33">
                                      <label htmlFor="form-field-field_94a11f9" className="elementor-field-label">Last Name</label>
                                      <input size={1} type="text" name="form_fields[field_94a11f9]" id="form-field-field_94a11f9" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Last Name" />
                                    </div>

                                    {/* Email */}
                                    <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-field_1d4235f elementor-col-50 elementor-field-required elementor-mark-required">
                                      <label htmlFor="form-field-field_1d4235f" className="elementor-field-label">Email</label>
                                      <input size={1} type="email" name="form_fields[field_1d4235f]" id="form-field-field_1d4235f" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Example@gmail.com" required />
                                    </div>

                                    {/* Phone */}
                                    <div className="elementor-field-type-tel elementor-field-group elementor-column elementor-field-group-field_1a51ca0 elementor-col-50 elementor-field-required elementor-mark-required">
                                      <label htmlFor="form-field-field_1a51ca0" className="elementor-field-label">Phone Number</label>
                                      <input size={1} type="tel" name="form_fields[field_1a51ca0]" id="form-field-field_1a51ca0" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="123456789" required pattern="[0-9()#&+*-=.]+" title="Only numbers and phone characters (#, -, *, etc) are accepted." />
                                    </div>

                                    {/* Street address */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_5e9c1a9 elementor-col-100 elementor-field-required elementor-mark-required">
                                      <label htmlFor="form-field-field_5e9c1a9" className="elementor-field-label">Current address</label>
                                      <input size={1} type="text" name="form_fields[field_5e9c1a9]" id="form-field-field_5e9c1a9" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Street address" required />
                                    </div>

                                    {/* Street address line 2 */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_07233be elementor-col-100 elementor-field-required elementor-mark-required">
                                      <input size={1} type="text" name="form_fields[field_07233be]" id="form-field-field_07233be" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Street address line 2" required />
                                    </div>

                                    {/* City */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_a035556 elementor-col-33 elementor-field-required elementor-mark-required">
                                      <input size={1} type="text" name="form_fields[field_a035556]" id="form-field-field_a035556" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="City" required />
                                    </div>

                                    {/* State */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_3e5f13a elementor-col-33 elementor-field-required elementor-mark-required">
                                      <input size={1} type="text" name="form_fields[field_3e5f13a]" id="form-field-field_3e5f13a" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="State/Province" required />
                                    </div>

                                    {/* Zip */}
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-field_49e73cd elementor-col-33 elementor-field-required elementor-mark-required">
                                      <input size={1} type="text" name="form_fields[field_49e73cd]" id="form-field-field_49e73cd" className="elementor-field elementor-size-sm elementor-field-textual" placeholder="Postal/Zip code" required />
                                    </div>

                                    {/* Upload resume */}
                                    <div className="elementor-field-type-upload elementor-field-group elementor-column elementor-field-group-message elementor-col-100 elementor-field-required elementor-mark-required">
                                      <label htmlFor="form-field-message" className="elementor-field-label">Upload your resume</label>
                                      <input type="file" name="form_fields[message][]" id="form-field-message" className="elementor-field elementor-size-sm elementor-upload-field" required multiple />
                                    </div>

                                    {/* Cover letter */}
                                    <div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-field_f79525b elementor-col-100">
                                      <label htmlFor="form-field-field_f79525b" className="elementor-field-label">Cover letter</label>
                                      <textarea className="elementor-field-textual elementor-field elementor-size-sm" name="form_fields[field_f79525b]" id="form-field-field_f79525b" rows={4}></textarea>
                                    </div>

                                    {/* Submit button */}
                                    <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
                                      <button className="elementor-button elementor-size-sm" type="submit">
                                        <span className="elementor-button-content-wrapper">
                                          <span className="elementor-button-text">Apply</span>
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>

                          {/* SMS notice */}
                          <div className="elementor-element elementor-element-0431f6b elementor-widget elementor-widget-text-editor" data-id="0431f6b" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                            <div className="elementor-widget-container">
                              <p className="career-sms-notice">
                                By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. You can reply STOP to opt-out of further messaging.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right spacer */}
                      <div
                        className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-b522821"
                        data-id="b522821"
                        data-element_type="column"
                        data-e-type="column"
                      >
                        <div className="elementor-widget-wrap"></div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
