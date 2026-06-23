import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { API_BASE_URL } from '../config';

const FacebookIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsappIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const subjects = [
    'General Inquiry',
    'Appointment Booking Assistance',
    'Genetic Test Panel Eligibility',
    'Report Interpretation Consultation',
    'Laboratory & Partner Support',
    'Feedback & Other Issues'
  ];

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!message.trim()) errors.message = 'Message content is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please correct the highlighted fields before submitting.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('General Inquiry');
        setMessage('');
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit contact message.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fbLink = "https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F";

  return (
    <div className="contact-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Get In Touch</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Contact The Gene Clinic
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Have questions about our testing packages, counselling services, or report timelines? Reach out to our coordinators today.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex' }}>
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Intake Coordination</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                Our intake coordinator will evaluate details submitted here. Personal clinical data is handled under strict security guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Contact Form */}
            <div className="card" style={{ padding: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {success ? (
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto', display: 'flex' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Message Sent Successfully</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '16px auto 32px', lineHeight: '1.7' }}>
                    Your general inquiry has been received. A clinical coordinator will contact you shortly using your preferred phone or email details.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-6">
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px' }}>Send Us A Message</h2>
                    <p className="small-text text-muted">Complete the intake fields below and we will contact you shortly.</p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-2">
                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Your Name *</label>
                      <input
                        type="text"
                        className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Dilhan Perera"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                      {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Phone Number *</label>
                      <input
                        type="tel"
                        className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +94 77 123 4567"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                      {validationErrors.phone && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Email Address *</label>
                      <input
                        type="email"
                        className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. dilhan.perera@example.com"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                      {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Subject</label>
                      <select
                        className="premium-input"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      >
                        {subjects.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Message *</label>
                    <textarea
                      className="premium-textarea"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Explain your inquiry details here..."
                      style={{ width: '100%', minHeight: '120px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
                    ></textarea>
                    {validationErrors.message && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                    style={{ height: '52px' }}
                  >
                    {loading ? 'Sending Message...' : 'Submit Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar with Info & Map */}
            <div className="flex-col gap-6" style={{ position: 'sticky', top: '100px' }}>
              
              {/* Contact Cards */}
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 700 }}>Clinic Information</h3>
                
                <div className="flex-col gap-5">
                  <div className="flex-row gap-3" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <MapPin size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h5 style={{ margin: '0 0 2px', fontSize: '0.88rem', fontWeight: 700 }}>Location</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                        The Gene Clinic (by GenSek Health Private Limited),<br />
                        Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex-row gap-3" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Phone size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h5 style={{ margin: '0 0 2px', fontSize: '0.88rem', fontWeight: 700 }}>Phone Lines</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                        Clinic Hotline: +94 77 123 4567<br />
                        Practitioner Support: +94 77 987 6543
                      </p>
                    </div>
                  </div>

                  <div className="flex-row gap-3" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Mail size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h5 style={{ margin: '0 0 2px', fontSize: '0.88rem', fontWeight: 700 }}>Email Details</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                        Inquiries: info@gensekhealth.com<br />
                        Support: clinic@gensekhealth.com
                      </p>
                    </div>
                  </div>

                  <div className="flex-row gap-3" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Clock size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h5 style={{ margin: '0 0 2px', fontSize: '0.88rem', fontWeight: 700 }}>Operational Hours</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                        Monday - Friday: 08:30 AM - 05:30 PM<br />
                        Saturday: 09:00 AM - 01:00 PM<br />
                        Sunday & Holidays: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>Connect With Us</h3>
                <div className="flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* TODO: Replace # with official social media URLs */}
                  <a
                    href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-row-center gap-2"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-row-center gap-2"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    YouTube
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-row-center gap-2"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-row-center gap-2"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    TikTok
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-row-center gap-2"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
