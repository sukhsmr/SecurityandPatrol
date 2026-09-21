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
            style={{ 
              position: 'fixed', 
              inset: 0, 
              backgroundColor: 'rgba(0,0,0,0.6)', 
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
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
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                maxHeight: '95vh',
                fontFamily: 'sans-serif',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
              <button
                onClick={onClose}
                style={{ position: 'absolute', top: '15px', right: '15px', color: '#f28e24', zIndex: 50, background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 style={{ color: '#f28e24', fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', marginTop: 0 }}>
                Request a Quote
              </h2>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Name</label>
                    <input type="text" placeholder="Enter your name" style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none' }} required />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Email</label>
                    <input type="email" placeholder="Enter your email" style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none' }} required />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Phone Number</label>
                  <input type="tel" placeholder="Enter your phone number" style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none' }} required />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Your Location</label>
                  <select style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none', backgroundColor: '#fff' }} required>
                    <option value="California (Bay Area)">California (Bay Area)</option>
                    <option value="Portland Oregon">Portland Oregon</option>
                    <option value="Seattle Washington">Seattle Washington</option>
                    <option value="Vancouver Washington">Vancouver Washington</option>
                    <option value="Houston Texas">Houston Texas</option>
                    <option value="San Antonio Texas">San Antonio Texas</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Service</label>
                  <select style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none', backgroundColor: '#fff' }} required>
                    <option value="Unarmed Security">Unarmed Security</option>
                    <option value="Armed Security">Armed Security</option>
                    <option value="Construction Site Security">Construction Site Security</option>
                    <option value="Mobile Patrol Security">Mobile Patrol Security</option>
                    <option value="Event Security">Event Security</option>
                    <option value="Commercial Security">Commercial Security</option>
                    <option value="Residential Security">Residential Security</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Message</label>
                  <textarea placeholder="Type message..." rows={4} style={{ padding: '10px 12px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '14px', width: '100%', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <div style={{ border: '1px solid #d3d3d3', borderRadius: '3px', padding: '10px 15px', backgroundColor: '#f9f9f9', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: 'fit-content', marginTop: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="recaptcha-mock" style={{ width: '20px', height: '20px', cursor: 'pointer' }} required />
                    <label htmlFor="recaptcha-mock" style={{ fontSize: '14px', cursor: 'pointer' }}>I'm not a robot</label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '30px' }}>
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA logo" style={{ width: '24px' }} />
                    <span style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>reCAPTCHA</span>
                  </div>
                </div>

                <button type="submit" style={{ backgroundColor: '#f28e24', color: '#fff', padding: '12px', border: 'none', borderRadius: '3px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  Send
                </button>
              </form>

              <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.5', marginTop: '15px', marginBottom: 0 }}>
                By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message & data rates may apply. You can reply STOP to opt-out of further messaging.
              </p>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
