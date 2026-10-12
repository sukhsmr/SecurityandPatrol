'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuoteModalContent } from '@/lib/cms/types';

interface RequestQuoteModalProps {
  content: QuoteModalContent;
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,25}$/;

export default function RequestQuoteModal({ content, isOpen, onClose }: RequestQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: content.locations[0] || '',
    service: content.services[0] || '',
    message: '',
    captcha: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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

  const handleClose = () => {
    setIsSuccess(false);
    setServerError(null);
    setErrors({});
    setTouched({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: content.locations[0] || '',
      service: content.services[0] || '',
      message: '',
      captcha: false,
    });
    onClose();
  };

  const validateField = (name: string, value: unknown): string => {
    switch (name) {
      case 'name':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Please enter your name (at least 2 characters).';
        }
        return '';
      case 'email':
        if (!value || typeof value !== 'string' || !EMAIL_REGEX.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'phone':
        if (!value || typeof value !== 'string' || !PHONE_REGEX.test(value.trim())) {
          return 'Please enter a valid phone number (at least 7 digits).';
        }
        return '';
      case 'location':
        if (!value) return 'Please select a location.';
        return '';
      case 'service':
        if (!value) return 'Please select a service.';
        return '';
      case 'captcha':
        if (!value) return 'Please check the reCAPTCHA box to continue.';
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
      location: validateField('location', formData.location),
      service: validateField('service', formData.service),
      captcha: validateField('captcha', formData.captcha),
    };

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        location: true,
        service: true,
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
          type: 'quote',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          location: formData.location,
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
        throw new Error(result.error || 'Failed to submit quote request. Please try again.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(3px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '32rem',
                backgroundColor: '#fff',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
                maxHeight: '95vh',
                fontFamily: 'sans-serif',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
                <button
                  onClick={handleClose}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    color: '#f28e24',
                    zIndex: 50,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                  }}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 style={{ color: '#f28e24', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: 0 }}>
                  {content.title}
                </h2>

                {isSuccess ? (
                  <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#22c55e',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '28px',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </div>
                    <h3 style={{ color: '#111827', fontSize: '22px', fontWeight: 'bold', margin: '0 0 10px' }}>
                      Quote Request Received!
                    </h3>
                    <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
                      Thank you, <strong>{formData.name}</strong>. Our security coordinators have received your request for <strong>{formData.service}</strong> and will contact you promptly with pricing and service details.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      style={{
                        backgroundColor: '#f28e24',
                        color: '#fff',
                        padding: '12px 28px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} noValidate>
                    {serverError && (
                      <div
                        style={{
                          padding: '10px 14px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fca5a5',
                          borderRadius: '4px',
                          color: '#991b1b',
                          fontSize: '13px',
                        }}
                      >
                        ⚠️ {serverError}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                          {content.nameLabel} <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={content.namePlaceholder}
                          style={{
                            padding: '10px 12px',
                            border: `1px solid ${errors.name ? '#dc2626' : '#ccc'}`,
                            borderRadius: '3px',
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                        {errors.name && <span style={{ color: '#dc2626', fontSize: '11px' }}>{errors.name}</span>}
                      </div>

                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                          {content.emailLabel} <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={content.emailPlaceholder}
                          style={{
                            padding: '10px 12px',
                            border: `1px solid ${errors.email ? '#dc2626' : '#ccc'}`,
                            borderRadius: '3px',
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                        {errors.email && <span style={{ color: '#dc2626', fontSize: '11px' }}>{errors.email}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                        {content.phoneLabel} <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={content.phonePlaceholder}
                        style={{
                          padding: '10px 12px',
                          border: `1px solid ${errors.phone ? '#dc2626' : '#ccc'}`,
                          borderRadius: '3px',
                          fontSize: '14px',
                          width: '100%',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                      {errors.phone && <span style={{ color: '#dc2626', fontSize: '11px' }}>{errors.phone}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                        {content.locationLabel} <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          padding: '10px 12px',
                          border: `1px solid ${errors.location ? '#dc2626' : '#ccc'}`,
                          borderRadius: '3px',
                          fontSize: '14px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: '#fff',
                          boxSizing: 'border-box',
                        }}
                      >
                        {content.locations.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.location && <span style={{ color: '#dc2626', fontSize: '11px' }}>{errors.location}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                        {content.serviceLabel} <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          padding: '10px 12px',
                          border: `1px solid ${errors.service ? '#dc2626' : '#ccc'}`,
                          borderRadius: '3px',
                          fontSize: '14px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: '#fff',
                          boxSizing: 'border-box',
                        }}
                      >
                        {content.services.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.service && <span style={{ color: '#dc2626', fontSize: '11px' }}>{errors.service}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{content.messageLabel}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={content.messagePlaceholder}
                        rows={3}
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '3px',
                          fontSize: '14px',
                          width: '100%',
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        border: `1px solid ${errors.captcha ? '#dc2626' : '#d3d3d3'}`,
                        borderRadius: '3px',
                        padding: '10px 15px',
                        backgroundColor: '#f9f9f9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 'fit-content',
                        marginTop: '5px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          name="captcha"
                          id="recaptcha-quote"
                          checked={formData.captcha}
                          onChange={handleChange}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <label htmlFor="recaptcha-quote" style={{ fontSize: '14px', cursor: 'pointer', margin: 0 }}>
                          {content.captchaLabel} <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '30px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA logo" style={{ width: '22px' }} />
                        <span style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>reCAPTCHA</span>
                      </div>
                    </div>
                    {errors.captcha && <span style={{ color: '#dc2626', fontSize: '11px', marginTop: '-8px' }}>{errors.captcha}</span>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: '#f28e24',
                        color: '#fff',
                        padding: '12px',
                        border: 'none',
                        borderRadius: '3px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        marginTop: '10px',
                        opacity: isSubmitting ? 0.75 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      {isSubmitting && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                      )}
                      {isSubmitting ? 'Submitting...' : content.submitText}
                    </button>
                  </form>
                )}

                <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.5', marginTop: '15px', marginBottom: 0 }}>
                  {content.disclaimer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
