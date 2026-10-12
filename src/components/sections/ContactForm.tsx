'use client';

import React, { useState } from 'react';
import type { ContactFormData } from '@/lib/cms/sections/definitions';

interface ContactFormProps {
  data: ContactFormData;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,25}$/;

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: data.services[0] || '',
    location: data.locations[0] || '',
    phone: '',
    message: '',
    accepted: false,
    captcha: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (name: string, value: unknown): string => {
    switch (name) {
      case 'name':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Please enter your name (at least 2 characters).';
        }
        return '';
      case 'email':
        if (!value || typeof value !== 'string' || !EMAIL_REGEX.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com).';
        }
        return '';
      case 'phone':
        if (!value || typeof value !== 'string' || !PHONE_REGEX.test(value.trim())) {
          return 'Please enter a valid phone number (at least 7 digits).';
        }
        return '';
      case 'service':
        if (!value) return 'Please select a service.';
        return '';
      case 'location':
        if (!value) return 'Please select a location.';
        return '';
      case 'accepted':
        if (!value) return 'You must agree to continue.';
        return '';
      case 'captcha':
        if (!value) return 'Please verify that you are not a robot.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      service: validateField('service', formData.service),
      location: validateField('location', formData.location),
      accepted: validateField('accepted', formData.accepted),
      captcha: validateField('captcha', formData.captcha),
    };

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        service: true,
        location: true,
        accepted: true,
        captcha: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submissions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          location: formData.location,
          message: formData.message.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
        throw new Error(result.error || 'Failed to submit the form. Please try again.');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        service: data.services[0] || '',
        location: data.locations[0] || '',
        phone: '',
        message: '',
        accepted: false,
        captcha: false,
      });
      setErrors({});
      setTouched({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="elementor-element elementor-element-623f6a0 elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="623f6a0" data-element_type="widget" data-e-type="widget">
      <div className="elementor-widget-container">
        {isSuccess ? (
          <div
            style={{
              padding: '24px 20px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              color: '#166534',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#22c55e',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              ✓
            </div>
            <h3 style={{ margin: '0 0 8px', color: '#15803d', fontSize: '20px', fontWeight: 'bold' }}>
              Message Sent Successfully!
            </h3>
            <p style={{ margin: '0 0 16px', color: '#166534', fontSize: '15px', lineHeight: '1.5' }}>
              Thank you for reaching out to Rayven Security Protection. Our security team has received your inquiry and will be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="elementor-button elementor-size-sm"
              style={{
                backgroundColor: '#f28e24',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="elementor-form" method="post" onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  color: '#991b1b',
                  fontSize: '14px',
                  marginBottom: '16px',
                }}
              >
                ⚠️ {serverError}
              </div>
            )}

            <div className="elementor-form-fields-wrapper elementor-labels-above">
              {/* First Name */}
              <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-50">
                <label htmlFor="form-field-name" className="elementor-field-label">
                  {data.firstNameLabel} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  size={1}
                  type="text"
                  name="name"
                  id="form-field-name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="elementor-field elementor-size-sm elementor-field-textual"
                  placeholder={data.firstNamePlaceholder}
                  style={{
                    borderColor: errors.name ? '#dc2626' : undefined,
                  }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-field_986fac2 elementor-col-50">
                <label htmlFor="form-field-field_986fac2" className="elementor-field-label">
                  {data.emailLabel} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  size={1}
                  type="email"
                  name="email"
                  id="form-field-field_986fac2"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="elementor-field elementor-size-sm elementor-field-textual"
                  placeholder={data.emailPlaceholder}
                  style={{
                    borderColor: errors.email ? '#dc2626' : undefined,
                  }}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Service Selection */}
              <div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_944ce13 elementor-col-100">
                <label htmlFor="form-field-field_944ce13" className="elementor-field-label">
                  {data.serviceLabel}
                </label>
                <div className="elementor-field elementor-select-wrapper remove-before">
                  <div className="select-caret-down-wrapper">
                    <i aria-hidden="true" className="eicon-caret-down"></i>
                  </div>
                  <select
                    name="service"
                    id="form-field-field_944ce13"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="elementor-field-textual elementor-size-sm"
                  >
                    {data.services.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location Selection */}
              <div className="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-field_df9ab1a elementor-col-100">
                <label htmlFor="form-field-field_df9ab1a" className="elementor-field-label">
                  {data.locationLabel}
                </label>
                <div className="elementor-field elementor-select-wrapper remove-before">
                  <div className="select-caret-down-wrapper">
                    <i aria-hidden="true" className="eicon-caret-down"></i>
                  </div>
                  <select
                    name="location"
                    id="form-field-field_df9ab1a"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="elementor-field-textual elementor-size-sm"
                  >
                    {data.locations.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div className="elementor-field-type-number elementor-field-group elementor-column elementor-field-group-field_0362869 elementor-col-100">
                <label htmlFor="form-field-field_0362869" className="elementor-field-label">
                  {data.phoneLabel} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="form-field-field_0362869"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="elementor-field elementor-size-sm elementor-field-textual"
                  placeholder="e.g. 510-754-8456"
                  style={{
                    borderColor: errors.phone ? '#dc2626' : undefined,
                  }}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-message elementor-col-100">
                <label htmlFor="form-field-message" className="elementor-field-label">
                  {data.messageLabel}
                </label>
                <textarea
                  className="elementor-field-textual elementor-field elementor-size-sm"
                  name="message"
                  id="form-field-message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={data.messagePlaceholder}
                />
              </div>

              {/* Acceptance checkbox */}
              <div className="elementor-field-type-acceptance elementor-field-group elementor-column elementor-field-group-field_e1d8d27 elementor-col-100">
                <div className="elementor-field-subgroup">
                  <span className="elementor-field-option">
                    <input
                      type="checkbox"
                      name="accepted"
                      id="form-field-field_e1d8d27"
                      checked={formData.accepted}
                      onChange={handleChange}
                      className="elementor-field elementor-size-sm elementor-acceptance-field"
                    />{' '}
                    <label htmlFor="form-field-field_e1d8d27" style={{ cursor: 'pointer' }}>
                      {data.acceptanceText} <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                  </span>
                </div>
                {errors.accepted && (
                  <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.accepted}
                  </span>
                )}
              </div>

              {/* reCAPTCHA Check */}
              <div className="elementor-field-type-recaptcha elementor-field-group elementor-column elementor-field-group-field_44a1ea6 elementor-col-100">
                <div
                  style={{
                    border: '1px solid #d3d3d3',
                    borderRadius: '4px',
                    padding: '10px 14px',
                    backgroundColor: '#f9f9f9',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 'fit-content',
                    gap: '20px',
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', margin: 0 }}>
                    <input
                      type="checkbox"
                      name="captcha"
                      checked={formData.captcha}
                      onChange={handleChange}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px', color: '#333' }}>I am not a robot</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '16px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" style={{ width: '22px' }} />
                    <span style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>reCAPTCHA</span>
                  </div>
                </div>
                {errors.captcha && (
                  <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.captcha}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
                <button
                  className="elementor-button elementor-size-sm"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span className="elementor-button-content-wrapper">
                    {isSubmitting && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255,255,255,0.4)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                    )}
                    <span className="elementor-button-text">
                      {isSubmitting ? 'Sending...' : data.submitText}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
