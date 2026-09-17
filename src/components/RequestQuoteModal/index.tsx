import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestQuoteModal({ isOpen, onClose }: RequestQuoteModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9998 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '42rem',
              backgroundColor: '#fff',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              zIndex: 9999,
              overflowY: 'auto',
              maxHeight: '90vh',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ padding: '0.5rem', position: 'relative' }}>
              <button
                  onClick={onClose}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#F29424', zIndex: 50, background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.75rem', width: '1.75rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
              {/* This popup was closed by default on every scraped page, so LiteSpeed's
                  critical-CSS capture (which only records above-the-fold, currently-visible
                  styles) never saw it open and never captured its widget-stacking rule —
                  every other .elementor-widget-wrap on the site got that rule from a page
                  where it *was* visible. Restored here, scoped to just this popup, rather
                  than adding it globally where it was never actually needed elsewhere. */}
              <style dangerouslySetInnerHTML={{ __html: '.elementor-1198 .elementor-widget-wrap { flex-direction: column; }' }} />
              <div className="elementor elementor-1198 elementor-location-popup" data-elementor-id="1198" data-elementor-post-type="elementor_library" data-elementor-settings='{"a11y_navigation":"yes","timing":[]}' data-elementor-type="popup">
<section className="elementor-section elementor-top-section elementor-element elementor-element-e7625d8 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="e7625d8" data-settings='{"background_background":"classic"}'>
<div className="elementor-container elementor-column-gap-default">
<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-135a856" data-e-type="column" data-element_type="column" data-id="135a856">
<div className="elementor-widget-wrap elementor-element-populated">
<div className="elementor-element elementor-element-e7d7a0f elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="e7d7a0f" data-widget_type="heading.default">
<div className="elementor-widget-container">
<h2 className="elementor-heading-title elementor-size-default">Request a Quote</h2>
</div>
</div>
<div className="elementor-element elementor-element-9d476f6 elementor-button-align-stretch elementor-widget elementor-widget-form" data-e-type="widget" data-element_type="widget" data-id="9d476f6" data-settings='{"step_next_label":"Next","step_previous_label":"Previous","button_width":"100","step_type":"number_text","step_icon_shape":"circle"}' data-widget_type="form.default">
<div className="elementor-widget-container">
<form aria-label="Get a Quote" className="elementor-form" method="post" name="Get a Quote">
<input name="post_id" type="hidden" defaultValue="1198"/>
<input name="form_id" type="hidden" defaultValue="9d476f6"/>
<input name="referer_title" type="hidden" defaultValue="Licensed Security Guard Services in California - Security and Patrol"/><input name="queried_id" type="hidden" defaultValue="7"/>
<div className="elementor-form-fields-wrapper elementor-labels-above">
<div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-50">
<label className="elementor-field-label" htmlFor="form-field-name">
												Name </label>
<input className="elementor-field elementor-size-sm elementor-field-textual" id="form-field-name" name="form_fields[name]" placeholder="Enter your name" size={1} type="text"/>
</div>
<div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-50 elementor-field-required">
<label className="elementor-field-label" htmlFor="form-field-email">
												Email </label>
<input className="elementor-field elementor-size-sm elementor-field-textual" id="form-field-email" name="form_fields[email]" placeholder="Enter your email" required size={1} type="email"/>
</div>
<div className="elementor-field-type-tel elementor-field-group elementor-column elementor-field-group-field_306047f elementor-col-100 elementor-field-required">
<label className="elementor-field-label" htmlFor="form-field-field_306047f">
												Phone Number </label>
<input className="elementor-field elementor-size-sm elementor-field-textual" id="form-field-field_306047f" name="form_fields[field_306047f]" pattern="[0-9()#&+*-=.]+" placeholder="Enter your phone number" required size={1} title="Only numbers and phone characters (#, -, *, etc) are accepted." type="tel"/>
</div>
<div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_fef6250 elementor-col-100 elementor-field-required">
<label className="elementor-field-label" htmlFor="form-field-field_fef6250">
												Your Location </label>
<div className="elementor-field elementor-select-wrapper remove-before">
<div className="select-caret-down-wrapper">
<i aria-hidden="true" className="eicon-caret-down"></i>
</div>
<select className="elementor-field-textual elementor-size-sm" id="form-field-field_fef6250" name="form_fields[field_fef6250]" required>
<option defaultValue="California (Bay Area)">California (Bay Area)</option>
<option defaultValue="Portland Oregon">Portland Oregon</option>
<option defaultValue="Seattle Washington">Seattle Washington</option>
<option defaultValue="Vancouver Washington">Vancouver Washington</option>
<option defaultValue="Houston Texas">Houston Texas</option>
<option defaultValue="San Antonio Texas">San Antonio Texas</option>
</select>
</div>
</div>
<div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_bbfac86 elementor-col-100 elementor-field-required">
<label className="elementor-field-label" htmlFor="form-field-field_bbfac86">
												Service </label>
<div className="elementor-field elementor-select-wrapper remove-before">
<div className="select-caret-down-wrapper">
<i aria-hidden="true" className="eicon-caret-down"></i>
</div>
<select className="elementor-field-textual elementor-size-sm" id="form-field-field_bbfac86" name="form_fields[field_bbfac86]" required>
<option defaultValue="Unarmed Security">Unarmed Security</option>
<option defaultValue="Armed Security">Armed Security</option>
<option defaultValue="Construction Site Security">Construction Site
														Security</option>
<option defaultValue="Mobile Patrol Security">Mobile Patrol Security
													</option>
<option defaultValue="Event Security">Event Security</option>
<option defaultValue="Commercial Security">Commercial Security</option>
<option defaultValue="Residential Security">Residential Security</option>
</select>
</div>
</div>
<div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-message elementor-col-100">
<label className="elementor-field-label" htmlFor="form-field-message">
												Message </label><textarea defaultValue="" className="elementor-field-textual elementor-field elementor-size-sm" id="form-field-message" name="form_fields[message]" placeholder="Type message..." rows={4} />
</div>
<div className="elementor-field-type-recaptcha elementor-field-group elementor-column elementor-field-group-field_98f9d26 elementor-col-100">
<div className="elementor-field" id="form-field-field_98f9d26">
<div className="elementor-g-recaptcha" data-sitekey="6LfBXe4kAAAAAF0M3DbCqRcEIcwuayRxvYhJ3ISJ" data-size="normal" data-theme="light" data-type="v2_checkbox"></div>
</div>
</div>
<div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
<button className="elementor-button elementor-size-sm" type="submit">
<span className="elementor-button-content-wrapper">
<span className="elementor-button-text">Send</span>
</span>
</button>
</div>
</div>
</form>
</div>
</div>
<div className="elementor-element elementor-element-fc5e308 elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="fc5e308" data-widget_type="text-editor.default">
<div className="elementor-widget-container">
<p>By providing a telephone number and submitting this form you are consenting to be
									contacted by SMS text message. Message & data rates may apply. You can reply
									STOP to opt-out of further messaging.</p>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
