import React, { useEffect } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            lineHeight: '1',
            cursor: 'pointer',
            color: '#f48020',
            padding: '5px',
            zIndex: 10,
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ padding: '30px 40px', overflowY: 'auto', boxSizing: 'border-box' }}>
          <h2
            style={{
              color: '#f48020',
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '20px',
              fontFamily: 'sans-serif',
              marginTop: 0,
            }}
          >
            Request a Quote
          </h2>
          <form method="post" name="Get a Quote" aria-label="Get a Quote" onSubmit={(e) => e.preventDefault()} style={{ fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ flex: '1 1 45%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              
              <div style={{ flex: '1 1 45%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9()#&amp;+*-=.]+"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Your Location
                </label>
                <select
                  name="location"
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  <option value="California (Bay Area)">California (Bay Area)</option>
                  <option value="Portland Oregon">Portland Oregon</option>
                  <option value="Seattle Washington">Seattle Washington</option>
                  <option value="Vancouver Washington">Vancouver Washington</option>
                  <option value="Houston Texas">Houston Texas</option>
                  <option value="San Antonio Texas">San Antonio Texas</option>
                </select>
              </div>
              
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Service
                </label>
                <select
                  name="service"
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  <option value="Unarmed Security">Unarmed Security</option>
                  <option value="Armed Security">Armed Security</option>
                  <option value="Construction Site Security">Construction Site Security</option>
                  <option value="Mobile Patrol Security">Mobile Patrol Security</option>
                  <option value="Event Security">Event Security</option>
                  <option value="Commercial Security">Commercial Security</option>
                  <option value="Residential Security">Residential Security</option>
                </select>
              </div>
              
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Type message..."
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                ></textarea>
              </div>
              
              <div style={{ flex: '1 1 100%', marginTop: '5px' }}>
                <div style={{ padding: '8px', border: '1px solid #e0e0e0', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '15px', backgroundColor: '#f9f9f9' }}>
                  <input type="checkbox" id="mock-recaptcha" style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
                  <label htmlFor="mock-recaptcha" style={{ fontSize: '14px', cursor: 'pointer', color: '#333' }}>I'm not a robot</label>
                  <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" alt="reCAPTCHA" />
                  </div>
                </div>
              </div>
              
              <div style={{ flex: '1 1 100%', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#f48020',
                    color: '#fff',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d96e1a')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f48020')}
                >
                  Send
                </button>
              </div>
            </div>
          </form>

          <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', lineHeight: '1.4', fontFamily: 'sans-serif' }}>
            <p style={{ margin: 0 }}>By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. You can reply STOP to opt-out of further messaging.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
