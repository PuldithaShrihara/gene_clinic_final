import React, { useState } from 'react';
import { Building2, CheckCircle2, AlertCircle, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function PartnerLaboratories() {
  const [labName, setLabName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!labName.trim()) errors.labName = 'Laboratory/Institution Name is required';
    if (!contactPerson.trim()) errors.contactPerson = 'Contact Person Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!location.trim()) errors.location = 'Location details are required';
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
      const response = await fetch(`${API_BASE_URL}/api/partner-lab-inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          labName,
          contactPerson,
          phone,
          email,
          location,
          services,
          message
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setLabName('');
        setContactPerson('');
        setPhone('');
        setEmail('');
        setLocation('');
        setServices('');
        setMessage('');
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit partnership inquiry.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-labs-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Laboratory Collaboration</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Partner Laboratories
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                We collaborate with leading accredited local and international molecular laboratories to coordinate high-complexity genetic screening panels and clinical diagnostics.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex' }}>
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Quality Standards</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                Our partner laboratories maintain CAP, CLIA, or ISO certifications, guaranteeing strict compliance with international diagnostics accuracy and security guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Paths & Form */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '32px', alignItems: 'start' }}>
            
            {/* Inquiry Form */}
            <div className="card" style={{ padding: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {success ? (
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto', display: 'flex' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Partnership Inquiry Submitted</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '16px auto 32px', lineHeight: '1.7' }}>
                    Your inquiry has been successfully received. A coordinator from our business operations team will contact you to discuss collaborative options and integration models.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px' }}>Partnership Inquiry</h2>
                    <p className="small-text text-muted">Submit details about your laboratory or facility to initiate collaboration discussions.</p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="flex-col gap-4">
                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Laboratory / Institution Name *</label>
                        <input
                          type="text"
                          className={`premium-input ${validationErrors.labName ? 'invalid' : ''}`}
                          value={labName}
                          onChange={e => setLabName(e.target.value)}
                          placeholder="e.g. Apex Diagnostics Lab"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.labName && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.labName}</span>}
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Contact Person *</label>
                        <input
                          type="text"
                          className={`premium-input ${validationErrors.contactPerson ? 'invalid' : ''}`}
                          value={contactPerson}
                          onChange={e => setContactPerson(e.target.value)}
                          placeholder="e.g. Dr. Priyantha Jayasuriya"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.contactPerson && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.contactPerson}</span>}
                      </div>
                    </div>

                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Phone Number *</label>
                        <input
                          type="tel"
                          className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="e.g. +94 11 234 5678"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.phone && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Email Address *</label>
                        <input
                          type="email"
                          className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="e.g. labs@apex.com"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>City / Country Location *</label>
                      <input
                        type="text"
                        className={`premium-input ${validationErrors.location ? 'invalid' : ''}`}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="e.g. Colombo, Sri Lanka"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                      {validationErrors.location && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.location}</span>}
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Offered Services / Testing Specialities</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={services}
                        onChange={e => setServices(e.target.value)}
                        placeholder="e.g. Next-Generation Sequencing (NGS), PCR diagnostics, Cytogenetics"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Proposal / Message</label>
                      <textarea
                        className="premium-textarea"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Detail potential collaboration points (e.g. sample logistics routing, billing schemes, diagnostic portfolios)..."
                        style={{ width: '100%', minHeight: '100px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                      style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                    >
                      {loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar information */}
            <div className="flex-col gap-6" style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>Collaboration Pathways</h3>
                <div className="flex-col gap-4 xsmall-text text-muted" style={{ lineHeight: '1.5' }}>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 700 }}>Diagnostics Routing</h5>
                    <p style={{ margin: 0 }}>
                      Send complex samples to specialized international facilities, ensuring strict cold-chain compliance and turnaround timelines.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 700 }}>Clinician Referrals</h5>
                    <p style={{ margin: 0 }}>
                      Link clinical geneticists with local sample collection points to provide seamless pre-test and post-test counselling for patients.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 700 }}>Integrative Reporting</h5>
                    <p style={{ margin: 0 }}>
                      Translate raw genomics datasets into standardized, physician-friendly clinical summaries and personalized wellness recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
