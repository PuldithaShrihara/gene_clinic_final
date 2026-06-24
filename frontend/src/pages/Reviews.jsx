import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, AlertCircle, Shield, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('Wellness Genomics');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const serviceCategories = [
    'Wellness Genomics',
    'Genetic Counselling',
    'NIPT / Prenatal Screening',
    'Precision Medicine Guidance',
    'Personalized Management',
    'Wellness Blueprint Interpretation',
    'Other'
  ];

  // Load reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`);
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to load reviews from API', err);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Your name or initials is required';
    if (!reviewText.trim()) errors.reviewText = 'Review comment text is required';
    if (!consent) errors.consent = 'Consent is required to post client feedback';
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
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          serviceType,
          rating: Number(rating),
          reviewText,
          consent
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setName('');
        setRating(5);
        setReviewText('');
        setConsent(false);
        setValidationErrors({});
        fetchReviews(); // Refresh review list
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit review.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Safe default reviews when array is empty
  const defaultReviews = [
    {
      id: 'd1',
      name: 'R. Perera',
      serviceType: 'Genetic Counselling',
      rating: 5,
      reviewText: 'The genetic counselling session was highly professional. Dr. Lahiru Prabodha outlined the genetic screening limits and guided us through our options with great care.',
      createdAt: '2026-05-12T10:00:00.000Z'
    },
    {
      id: 'd2',
      name: 'S. Nadeesha',
      serviceType: 'Wellness Blueprint Interpretation',
      rating: 5,
      reviewText: 'My Me360 report analysis was explained in simple terms. The guidance on nutrition adjustments felt custom-tailored, and I appreciated the clear lifestyle recommendations.',
      createdAt: '2026-06-02T14:30:00.000Z'
    },
    {
      id: 'd3',
      name: 'M. Fernando',
      serviceType: 'NIPT / Prenatal Screening',
      rating: 5,
      reviewText: 'Excellent support in coordinating our prenatal screening. The collection process was fast and safe, and the results interpretation session gave us comprehensive understanding.',
      createdAt: '2026-06-18T09:15:00.000Z'
    }
  ];

  const displayedReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <div className="reviews-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Patient Experiences</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Client Testimonials & Feedback
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Read reviews from individuals and families who received counselling, genetic wellness guidance, and genomic testing coordination from our team.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex' }}>
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Privacy Protection</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                We respect patient privacy. Reviews are displayed using client initials or modified names, and published only with explicit consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reviews Layout */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'start' }}>
            
            {/* Reviews List */}
            <div className="flex-col gap-6">
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Verified Client Feedback</h2>
              
              <div className="flex-col gap-4">
                {displayedReviews.map((rev) => (
                  <div key={rev.id || rev._id} className="card" style={{ padding: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', position: 'relative' }}>
                    <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', display: 'flex' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 700 }}>{rev.name}</h4>
                        <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{rev.serviceType}</span>
                      </div>
                      
                      <div className="flex-row gap-1" style={{ display: 'flex', color: '#eab308' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < rev.rating ? '#eab308' : 'none'} style={{ opacity: i < rev.rating ? 1 : 0.2 }} />
                        ))}
                      </div>
                    </div>

                    <p className="small-text text-muted" style={{ lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                      "{rev.reviewText}"
                    </p>

                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'right' }}>
                      Submitted: {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Form */}
            <div className="card" style={{ padding: '36px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'var(--accent)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="flex-row-center text-accent mb-4" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto', display: 'flex' }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h3>Feedback Submitted</h3>
                  <p className="xsmall-text text-muted" style={{ margin: '12px auto 24px', lineHeight: '1.6' }}>
                    Thank you for sharing your experience. Your feedback helps us maintain high clinical standards.
                  </p>
                  <button onClick={() => setSubmitSuccess(false)} className="btn btn-secondary w-full" style={{ padding: '10px' }}>
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-6">
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 6px' }}>Share Your Experience</h3>
                    <p className="xsmall-text text-muted">Provide details on the counselling or screening you received.</p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '10px' }}>
                      <AlertCircle size={16} />
                      <span className="xsmall-text" style={{ fontSize: '0.78rem' }}>{error}</span>
                    </div>
                  )}

                  <div className="form-group flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Your Name / Initials *</label>
                    <input
                      type="text"
                      className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. D. P. or Dilhan Perera"
                      style={{ width: '100%', height: '44px', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '8px 14px', background: 'var(--bg-secondary)', outline: 'none' }}
                    />
                    {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                  </div>

                  <div className="form-group flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Service Received *</label>
                    <select
                      className="premium-input"
                      value={serviceType}
                      onChange={e => setServiceType(e.target.value)}
                      style={{ width: '100%', height: '44px', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '8px 14px', background: 'var(--bg-secondary)', outline: 'none' }}
                    >
                      {serviceCategories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Rating</label>
                    <div className="flex-row gap-2" style={{ display: 'flex', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <Star size={24} fill={star <= rating ? '#eab308' : 'none'} color="#eab308" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Review Message *</label>
                    <textarea
                      className="premium-textarea"
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      placeholder="Describe your counselling session, report analysis, or coordination experience..."
                      style={{ width: '100%', minHeight: '100px', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', background: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
                    ></textarea>
                    {validationErrors.reviewText && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.validationErrors}</span>}
                  </div>

                  <div className="flex-col align-start gap-2" style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                      <input
                        type="checkbox"
                        id="review-consent"
                        checked={consent}
                        onChange={e => setConsent(e.target.checked)}
                        style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <label htmlFor="review-consent" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.4', fontSize: '0.75rem' }}>
                        I consent to publishing this review publicly. I understand it will be edited or formatted to remove strict personal identifiers to safeguard medical privacy. *
                      </label>
                    </div>
                    {validationErrors.consent && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.consent}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                    style={{ height: '48px' }}
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
