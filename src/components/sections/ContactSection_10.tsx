'use client';
// @ts-nocheck
import React, { useState, useEffect } from 'react';

const ContactSection_10 = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#request-quote-modal');
    };
    handleHashChange(); // check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', overflowY: 'auto', padding: '40px 0' }} onClick={() => { window.location.hash = ''; }}>
        <div style={{ position: 'relative', width: '90%', maxWidth: '800px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', margin: 'auto', padding: '20px', maxHeight: '100%', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => { window.location.hash = ''; }}
            style={{ position: 'absolute', top: '15px', right: '20px', zIndex: 10, color: '#6b7280', fontSize: '36px', fontWeight: 'bold', lineHeight: 1, background: 'transparent', border: 'none', cursor: 'pointer' }}
            aria-label="Close modal"
          >
            &times;
          </button>
          <section className="elementor-section elementor-top-section elementor-element elementor-element-e7625d8 elementor-section-boxed elementor-section-height-default elementor-section-height-default" style={{ padding: '20px 0' }} data-id="e7625d8" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"><div className="elementor-container elementor-column-gap-default"><div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-135a856" data-id="135a856" data-element_type="column" data-e-type="column"><div className="elementor-widget-wrap elementor-element-populated"><div className="elementor-element elementor-element-e7d7a0f elementor-widget elementor-widget-heading" data-id="e7d7a0f" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default"><div className="elementor-widget-container"><h2 className="elementor-heading-title elementor-size-default">Request a Quote</h2></div></div><div className="elementor-element elementor-element-9d476f6 elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="9d476f6" data-element_type="widget" data-e-type="widget" data-settings="{&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;button_width&quot;:&quot;100&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default"><div className="elementor-widget-container"><form className="elementor-form" method="post" name="Get a Quote" aria-label="Get a Quote">
<input type="hidden" name="post_id" value="1198" />
<input type="hidden" name="form_id" value="9d476f6" />
<input type="hidden" name="referer_title" value="Licensed Security Guard Services in California - ADS Guards" /><input type="hidden" name="queried_id" value="7" /><div className="elementor-form-fields-wrapper elementor-labels-above"><div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-50">
<label htmlFor="form-field-name" className="elementor-field-label">
Name							</label>
<input size={1} type="text" name="form_fields[name]" id="form-field-name" className="elementor-field elementor-size-sm  elementor-field-textual" placeholder="Enter your name" /></div><div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-50 elementor-field-required">
<label htmlFor="form-field-email" className="elementor-field-label">
Email							</label>
<input size={1} type="email" name="form_fields[email]" id="form-field-email" className="elementor-field elementor-size-sm  elementor-field-textual" placeholder="Enter your email" required={true} /></div><div className="elementor-field-type-tel elementor-field-group elementor-column elementor-field-group-field_306047f elementor-col-100 elementor-field-required">
<label htmlFor="form-field-field_306047f" className="elementor-field-label">
Phone Number							</label>
<input size={1} type="tel" name="form_fields[field_306047f]" id="form-field-field_306047f" className="elementor-field elementor-size-sm  elementor-field-textual" placeholder="Enter your phone number" required={true} pattern="[0-9()#&amp;+*-=.]+" title="Only numbers and phone characters (#, -, *, etc) are accepted." /></div><div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_fef6250 elementor-col-100 elementor-field-required">
<label htmlFor="form-field-field_fef6250" className="elementor-field-label">
Your Location							</label><div className="elementor-field elementor-select-wrapper remove-before "><div className="select-caret-down-wrapper">
<i aria-hidden="true" className="eicon-caret-down"></i></div>
<select name="form_fields[field_fef6250]" id="form-field-field_fef6250" className="elementor-field-textual elementor-size-sm" required={true}><option value="California (Bay Area)">California (Bay Area)</option><option value="Portland Oregon">Portland Oregon</option><option value="Seattle Washington">Seattle Washington</option><option value="Vancouver Washington">Vancouver Washington</option><option value="Houston Texas">Houston Texas</option><option value="San Antonio Texas">San Antonio Texas</option>
</select></div></div><div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_bbfac86 elementor-col-100 elementor-field-required">
<label htmlFor="form-field-field_bbfac86" className="elementor-field-label">
Service							</label><div className="elementor-field elementor-select-wrapper remove-before "><div className="select-caret-down-wrapper">
<i aria-hidden="true" className="eicon-caret-down"></i></div>
<select name="form_fields[field_bbfac86]" id="form-field-field_bbfac86" className="elementor-field-textual elementor-size-sm" required={true}><option value="Unarmed Security">Unarmed Security</option><option value="Armed Security">Armed Security</option><option value="Construction Site Security">Construction Site Security</option><option value="Mobile Patrol Security">Mobile Patrol Security</option><option value="Event Security">Event Security</option><option value="Commercial Security">Commercial Security</option><option value="Residential Security">Residential Security</option>
</select></div></div><div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-message elementor-col-100">
<label htmlFor="form-field-message" className="elementor-field-label">
Message							</label><textarea className="elementor-field-textual elementor-field  elementor-size-sm" name="form_fields[message]" id="form-field-message" rows={4} placeholder="Type message..."></textarea></div><div className="elementor-field-type-recaptcha elementor-field-group elementor-column elementor-field-group-field_98f9d26 elementor-col-100"><div className="elementor-field" id="form-field-field_98f9d26"><div className="elementor-g-recaptcha" data-sitekey="6LfBXe4kAAAAAF0M3DbCqRcEIcwuayRxvYhJ3ISJ" data-type="v2_checkbox" data-theme="light" data-size="normal"></div></div></div><div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
<button className="elementor-button elementor-size-sm" type="submit">
<span className="elementor-button-content-wrapper">
<span className="elementor-button-text">Send</span>
</span>
</button></div></div></form></div></div><div className="elementor-element elementor-element-fc5e308 elementor-widget elementor-widget-text-editor" data-id="fc5e308" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default"><div className="elementor-widget-container"><p>By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. You can reply STOP to opt-out of further&nbsp;messaging.</p></div></div></div></div></div></section>
        </div>
      </div>
    </>
  );
};

export default ContactSection_10;
