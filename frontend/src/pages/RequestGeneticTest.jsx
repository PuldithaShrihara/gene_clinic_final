import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, AlertCircle, Phone, MessageSquare, Shield, HelpCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function RequestGeneticTest() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [testCategory, setTestCategory] = useState('Wellness Genomics');
  const [reason, setReason] = useState('');
  const [referralDetails, setReferralDetails] = useState('');
  const [preferredContact, setPreferredContact] = useState('Email');
  const [consent, setConsent] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const testCategories = [
    'Wellness Genomics',
    'NIPT / Prenatal Screening',
    'Clinical Genetic Test',
    'Cancer Genetics',
    'Whole Exome Sequencing',
    'Whole Genome Sequencing',
    'Genetic Report Interpretation',
    'Me360 Wellness Blueprint',
    'Other'
  ];

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!testCategory) errors.testCategory = 'Test Category is required';
    if (!consent) errors.consent = 'Consent is required to submit';
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
      const response = await fetch(`${API_BASE_URL}/api/genetic-test-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          age,
          testCategory,
          reason,
          referralDetails,
          preferredContactMethod: preferredContact,
          consent
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setAge('');
        setReason('');
        setReferralDetails('');
        setConsent(false);
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit genetic test request.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-test-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Diagnostics Coordination</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Request a Genetic Test
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Submit a request for genetic wellness blueprinting, NIPT screening, clinical panels, or exome sequencing. Our clinical team will coordinate sample logistics, laboratory partnerships, and professional pre-test counselling.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Responsible Testing</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                We coordinate test processing with accredited national and international partner laboratories. All clinical testing requires professional interpretation and guidance to support your medical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '32px', alignItems: 'start' }}>
            
            <div className="card" style={{ padding: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {success ? (
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Test Request Received</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '16px auto 32px', lineHeight: '1.7' }}>
                    Your request has been saved. A clinical coordinator will contact you to review history details, confirm test appropriateness, and outline sample collection logistics.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Request Another Test
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px' }}>Request Details</h2>
                    <p className="small-text text-muted">Provide patient details and specify which genetic test category you wish to request.</p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* Section 1: Patient Details */}
                  <div className="flex-col gap-4">
                    <div className="form-section-title" style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
                      1. Patient Information
                    </div>
                    
                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Patient Full Name *</label>
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
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Age</label>
                        <input
                          type="number"
                          className="premium-input"
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          placeholder="e.g. 34"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Test Specifics */}
                  <div className="flex-col gap-4">
                    <div className="form-section-title" style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
                      2. Testing Details
                    </div>

                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Test Category *</label>
                        <select
                          className="premium-input"
                          value={testCategory}
                          onChange={e => setTestCategory(e.target.value)}
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        >
                          {testCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Preferred Contact Method</label>
                        <select
                          className="premium-input"
                          value={preferredContact}
                          onChange={e => setPreferredContact(e.target.value)}
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        >
                          <option value="Email">Email</option>
                          <option value="Phone call">Phone call</option>
                          <option value="WhatsApp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Reason for Testing</label>
                      <textarea
                        className="premium-textarea"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Please describe family history, specific symptoms, or screening goals..."
                        style={{ width: '100%', minHeight: '100px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
                      ></textarea>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Referring Doctor / Hospital Details (Optional)</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={referralDetails}
                        onChange={e => setReferralDetails(e.target.value)}
                        placeholder="e.g. Dr. K. Silva (Colombo General Hospital)"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Consent & Submit */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div className="card flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px', gap: '10px' }}>
                      <div className="flex-row align-start gap-3" style={{ display: 'flex' }}>
                        <input
                          type="checkbox"
                          id="test-consent"
                          checked={consent}
                          onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="test-consent" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5' }}>
                          I understand that genetic testing is a clinical diagnostic screening procedure. I request coordination support from The Gene Clinic and consent to storing this request record under strict clinical privacy guidelines. *
                        </label>
                      </div>
                      {validationErrors.consent && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.consent}</span>}
                    </div>

                    <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                      >
                        {loading ? 'Submitting Request...' : 'Submit test request'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="flex-col gap-6" style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>Testing Guidelines</h3>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '16px' }}>
                  A genetic test request is evaluated for appropriateness before samples are collected.
                </p>
                <ul className="xsmall-text text-muted flex-col gap-2" style={{ listStyleType: 'disc', paddingLeft: '18px', lineHeight: '1.5' }}>
                  <li>Pre-test genetic counselling is recommended.</li>
                  <li>We process samples using accredited molecular facilities.</li>
                  <li>Turnaround times general average around 3–6 weeks depending on panel style.</li>
                </ul>
              </div>

              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>Need Consultation?</h3>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '16px' }}>
                  Unsure which testing panel suits your clinical background or family history?
                </p>
                <a href="/appointments" className="btn btn-secondary w-full text-center" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
                  Book Pre-Test Consultation
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
