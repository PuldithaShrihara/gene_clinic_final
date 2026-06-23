import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Shield, 
  Info, 
  Phone, 
  MessageSquare,
  ChevronRight,
  Clock,
  MapPin,
  Laptop,
  Users,
  Mail,
  Dna
} from 'lucide-react';

export default function Appointments() {
  const queryLocation = useLocation();
  const navigate = useNavigate();

  // Helper to determine tab index based on pathname
  const getTabFromPath = (path) => {
    if (path === '/contact') return 0;
    if (path === '/request-genetic-test') return 1;
    return 2; // Default to /appointments (Book appointment)
  };

  const [activeFormTab, setActiveFormTab] = useState(getTabFromPath(queryLocation.pathname));

  // Shared form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    age: "",
    appointmentType: "",
    clinicLocation: "",
    preferredMode: "",
    preferredDate: "",
    preferredTimeSlot: "",
    reason: "",
    message: "",
    geneticReport: null,
    medicalReport: null,
    referralLetter: null,
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || null
    }));
  };

  // Status & states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Tab 0 (Inquiries) specific states
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const contactSubjects = [
    'General Inquiry',
    'Appointment Booking Assistance',
    'Genetic Test Panel Eligibility',
    'Report Interpretation Consultation',
    'Laboratory & Partner Support',
    'Feedback & Other Issues'
  ];

  // Tab 1 (Test Requests) specific states
  const [testCategory, setTestCategory] = useState('Wellness Genomics');
  const [referralDetails, setReferralDetails] = useState('');
  const [preferredContact, setPreferredContact] = useState('Email');
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

  // Tab 2 (Appointments) specific states
  const [apptType, setApptType] = useState('Clinical Genetics Consultation');
  const [clinicLocation, setClinicLocation] = useState('Galle Clinic');
  const [mode, setMode] = useState('In-person');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 12:00 PM (Morning)');
  const [geneticReportName, setGeneticReportName] = useState('');
  const [medicalReportName, setMedicalReportName] = useState('');
  const [referralReportName, setReferralReportName] = useState('');

  // Sync tab active index based on route changes
  useEffect(() => {
    const tabIndex = getTabFromPath(queryLocation.pathname);
    setActiveFormTab(tabIndex);
    
    // Read optional query parameters
    const params = new URLSearchParams(queryLocation.search);
    const typeParam = params.get('type');
    const actionParam = params.get('action');
    
    if (typeParam) {
      setApptType(typeParam);
    }
    
    // Auto scroll to uploader if action=upload is in URL
    if (actionParam === 'upload') {
      setTimeout(() => {
        const uploaderElem = document.getElementById('uploader-section');
        if (uploaderElem) {
          uploaderElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [queryLocation]);

  const handleTabChange = (tabIndex) => {
    setActiveFormTab(tabIndex);
    setSuccess(false);
    setError('');
    setValidationErrors({});
    
    // Update routes to reflect selected tabs natively
    if (tabIndex === 0) navigate('/contact');
    else if (tabIndex === 1) navigate('/request-genetic-test');
    else navigate('/appointments');
  };

  const validateForm = () => {
    const errors = {};
    if (activeFormTab === 0 || activeFormTab === 1) {
      if (!name.trim()) errors.name = 'Patient Full Name is required';
      if (!phone.trim()) errors.phone = 'Phone Number is required';
      if (!email.trim()) errors.email = 'Email Address is required';
    }

    if (activeFormTab === 0) {
      if (!message.trim()) errors.message = 'Message content is required';
    }

    if (activeFormTab === 1) {
      if (!consent) errors.consent = 'You must give consent to submit details';
    }

    if (activeFormTab === 2) {
      if (!formData.patientName.trim()) errors.patientName = 'Patient Full Name is required';
      if (!formData.phone.trim()) errors.phone = 'Phone Number is required';
      if (!formData.email.trim()) errors.email = 'Email Address is required';
      if (!formData.appointmentType.trim()) errors.appointmentType = 'Appointment Type is required';
      if (!formData.clinicLocation.trim()) errors.clinicLocation = 'Clinic Location is required';
      if (!formData.preferredMode.trim()) errors.preferredMode = 'Preferred Mode is required';
      if (!formData.preferredDate.trim()) errors.preferredDate = 'Preferred Date is required';
      if (!formData.preferredTimeSlot.trim()) errors.preferredTimeSlot = 'Preferred Time Slot is required';
      if (!formData.reason.trim()) errors.reason = 'Reason for Consultation is required';
      if (!formData.consent) errors.consent = 'You must consent to the medical privacy disclosure';
    }
    
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
      let endpoint = '';
      let payload = {};

      if (activeFormTab === 0) {
        endpoint = `${API_BASE_URL}/api/contact`;
        payload = {
          name,
          email,
          phone,
          subject: contactSubject,
          message
        };
      } else if (activeFormTab === 1) {
        endpoint = `${API_BASE_URL}/api/genetic-test-requests`;
        payload = {
          name,
          phone,
          email,
          age: age || null,
          testCategory,
          reason: reason || 'Test requested',
          referralDetails,
          preferredContactMethod: preferredContact,
          consent
        };
      } else {
        endpoint = `${API_BASE_URL}/api/appointments`;
        // Prepare combined values for backend compatibility
        const combinedReason = formData.message.trim() 
          ? `${formData.reason}\n\nAdditional Notes: ${formData.message}` 
          : formData.reason;

        payload = {
          name: formData.patientName,
          patientName: formData.patientName,
          phone: formData.phone,
          email: formData.email,
          age: formData.age,
          appointmentType: formData.appointmentType,
          location: formData.clinicLocation,
          clinicLocation: formData.clinicLocation,
          mode: formData.preferredMode,
          preferredMode: formData.preferredMode,
          date: formData.preferredDate,
          preferredDate: formData.preferredDate,
          timeSlot: formData.preferredTimeSlot,
          preferredTimeSlot: formData.preferredTimeSlot,
          reason: combinedReason,
          message: formData.message,
          geneticReportName: formData.geneticReport?.name || "",
          medicalReportName: formData.medicalReport?.name || "",
          referralLetterName: formData.referralLetter?.name || "",
          consent: formData.consent,
          paymentStatus: "Pending",
          source: "Website Appointment Page"
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset states
        if (activeFormTab === 2) {
          setFormData({
            patientName: "",
            phone: "",
            email: "",
            age: "",
            appointmentType: "",
            clinicLocation: "",
            preferredMode: "",
            preferredDate: "",
            preferredTimeSlot: "",
            reason: "",
            message: "",
            geneticReport: null,
            medicalReport: null,
            referralLetter: null,
            consent: false
          });
        } else {
          setName('');
          setPhone('');
          setEmail('');
          setAge('');
          setReason('');
          setMessage('');
          setDate('');
          setGeneticReportName('');
          setMedicalReportName('');
          setReferralReportName('');
          setConsent(false);
          setReferralDetails('');
        }
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit form request.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Make sure the Node server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop uploader sub-component helper
  const FileUploader = ({ label, helper, fileName, setFileName, themeColor = 'var(--secondary)' }) => {
    const [dragActive, setDragActive] = useState(false);
    const id = label.replace(/\s+/g, '-').toLowerCase();

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFileName(e.dataTransfer.files[0].name);
      }
    };

    return (
      <div className="form-group flex-col" style={{ gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</label>
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${id}`).click()}
          style={{
            border: '2px dashed ' + (dragActive ? themeColor : 'var(--border-color)'),
            borderRadius: '16px',
            padding: '24px 16px',
            textAlign: 'center',
            background: dragActive ? 'rgba(2, 132, 199, 0.05)' : 'rgba(2, 132, 199, 0.01)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            position: 'relative'
          }}
        >
          <Upload size={24} style={{ color: themeColor, margin: '0 auto 8px' }} />
          <p className="xsmall-text text-main" style={{ margin: '0 0 4px', fontWeight: 600 }}>
            {fileName ? fileName : 'Click to upload or drag file here'}
          </p>
          <span className="xsmall-text text-light" style={{ fontSize: '0.75rem' }}>{helper}</span>
          <input 
            id={`file-input-${id}`}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && setFileName(e.target.files[0].name)}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="appointments-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* CSS style injection to polish input controls and layout consistency */}
      <style>{`
        .appointments-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 32px;
          align-items: start;
        }

        .premium-input {
          width: 100%;
          height: 48px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px 16px;
          font-size: 0.92rem;
          color: var(--text-main);
          background: var(--bg-secondary);
          outline: none;
          transition: all var(--transition-fast);
        }

        .premium-input:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }

        .premium-input.invalid {
          border-color: #dc2626 !important;
          background: #fef2f2;
        }

        .premium-textarea {
          width: 100%;
          min-height: 120px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.92rem;
          color: var(--text-main);
          background: var(--bg-secondary);
          outline: none;
          resize: none;
          transition: all var(--transition-fast);
        }

        .premium-textarea:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }

        .premium-textarea.invalid {
          border-color: #dc2626 !important;
          background: #fef2f2;
        }

        .form-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .sidebar-help-card {
          padding: 32px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          box-shadow: var(--shadow-sm);
        }

        .portal-tab-btn {
          padding: 12px 20px;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-muted);
        }

        .portal-tab-btn.active {
          background-color: var(--secondary);
          color: white;
          border-color: var(--secondary);
        }

        .portal-tab-btn:hover:not(.active) {
          background-color: var(--bg-tertiary);
          border-color: var(--secondary);
          color: var(--secondary);
        }

        @media (max-width: 992px) {
          .appointments-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      {/* Hero Header */}
      <section className="section" style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Column */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                {activeFormTab === 0 ? 'Get In Touch' : activeFormTab === 1 ? 'Request Test' : 'The Gene Clinic'}
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: '1.25', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                {activeFormTab === 0 && 'Contact The Gene Clinic'}
                {activeFormTab === 1 && 'Request a Genetic Test'}
                {activeFormTab === 2 && 'Book an Appointment with The Gene Clinic'}
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '640px', marginBottom: '24px' }}>
                {activeFormTab === 0 && 'Have questions about our testing packages, counselling services, or report timelines? Reach out to our coordinators today.'}
                {activeFormTab === 1 && 'Select from our genomic wellness profiles, prenatal screening, or clinical diagnostics panels.'}
                {activeFormTab === 2 && 'Request a counselling appointment with The Gene Clinic by GenSek Health Private Limited, led by Dr. L. B. Lahiru Prabodha.'}
              </p>
              
              {/* Trust Badges */}
              <div className="flex-row gap-x-6 gap-y-2 flex-wrap text-muted" style={{ display: 'flex' }}>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">🛡️ Secure report processing</span>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">💻 Online or in-person</span>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">🩺 Specialist counselling</span>
              </div>
            </div>

            {/* Right Column Summary card */}
            <div className="card card-glass flex-col" style={{ padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  {activeFormTab === 0 ? 'Intake Coordination' : activeFormTab === 1 ? 'Diagnostics Routing' : 'Data Confidentiality'}
                </h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                {activeFormTab === 0 && 'Our intake coordinator will evaluate details submitted here. Personal clinical data is handled under strict security guidelines.'}
                {activeFormTab === 1 && "Testing requests are reviewed by Dr. Lahiru Prabodha's lab team to confirm assay suitability prior to specimen extraction."}
                {activeFormTab === 2 && 'All genetic data files and report uploads are processed securely. Information is released only to accredited medical coordinators under strict clinical privacy guidelines.'}
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div className="appointments-grid">
            
            {/* Form Column */}
            <div 
              className="card" 
              style={{ 
                padding: '40px', 
                background: 'var(--bg-secondary)', 
                borderRadius: '24px', 
                border: '1px solid var(--border-color)', 
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              {/* Top Accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {/* Portal Form Navigation Tabs */}
              <div className="flex-row gap-2 mb-8" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleTabChange(0)}
                  className={`portal-tab-btn ${activeFormTab === 0 ? 'active' : ''}`}
                >
                  <MessageSquare size={16} /> General inquiries
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange(1)}
                  className={`portal-tab-btn ${activeFormTab === 1 ? 'active' : ''}`}
                >
                  <Dna size={16} /> Request Genetic test
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange(2)}
                  className={`portal-tab-btn ${activeFormTab === 2 ? 'active' : ''}`}
                >
                  <Calendar size={16} /> Book appointment for Genetic counseling
                </button>
              </div>

              {success ? (
                /* Success State Card */
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent text-center-icon mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px' }}>
                    {activeFormTab === 0 ? 'Message Sent Successfully' : 'Request Submitted'}
                  </h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>
                    {activeFormTab === 0 && 'Your general inquiry has been received. A clinical coordinator will contact you shortly using your preferred phone or email details.'}
                    {activeFormTab === 1 && 'Your genetic test request has been submitted. The lab team will review your eligibility and coordinate specimen collection details.'}
                    {activeFormTab === 2 && 'Your appointment request has been submitted. The clinic team will review your details and uploaded files, and contact you shortly to confirm your consultation.'}
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    {activeFormTab === 0 && 'Send Another Message'}
                    {activeFormTab === 1 && 'Request Another Test'}
                    {activeFormTab === 2 && 'Book Another Appointment'}
                  </button>
                </div>
              ) : (
                /* Main Tab Forms Form */
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  
                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* FORM 1: GENERAL INQUIRIES */}
                  {activeFormTab === 0 && (
                    <div className="flex-col gap-6">
                      <div className="form-section-title">
                        <Users size={18} className="text-secondary" /> Contact Details
                      </div>

                      <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Your Name *</label>
                          <input
                            type="text"
                            className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Dilhan Perera"
                          />
                          {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Phone Number *</label>
                          <input
                            type="tel"
                            className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="e.g. +94 77 123 4567"
                          />
                          {validationErrors.phone && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Email Address *</label>
                          <input
                            type="email"
                            className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="e.g. dilhan.perera@example.com"
                          />
                          {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Inquiry Subject</label>
                          <select
                            className="premium-input"
                            value={contactSubject}
                            onChange={e => setContactSubject(e.target.value)}
                            style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                          >
                            {contactSubjects.map((sub, idx) => (
                              <option key={idx} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Message Details *</label>
                        <textarea
                          className={`premium-textarea ${validationErrors.message ? 'invalid' : ''}`}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Please explain the details of your inquiry here..."
                        ></textarea>
                        {validationErrors.message && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.message}</span>}
                      </div>

                      <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary"
                          style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                        >
                          {loading ? 'Sending Message...' : 'Submit Message'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FORM 2: REQUEST GENETIC TEST */}
                  {activeFormTab === 1 && (
                    <div className="flex-col gap-6">
                      <div className="form-section-title">
                        <Users size={18} className="text-secondary" /> Requestor Information
                      </div>

                      <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Your Name *</label>
                          <input
                            type="text"
                            className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Dilhan Perera"
                          />
                          {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Phone Number *</label>
                          <input
                            type="tel"
                            className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="e.g. +94 77 123 4567"
                          />
                          {validationErrors.phone && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Email Address *</label>
                          <input
                            type="email"
                            className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="e.g. dilhan.perera@example.com"
                          />
                          {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Age (Optional)</label>
                          <input
                            type="number"
                            className="premium-input"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            placeholder="e.g. 34"
                          />
                        </div>
                      </div>

                      <div className="form-section-title">
                        <Dna size={18} className="text-accent" /> Testing Details
                      </div>

                      <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Genetic Test Category *</label>
                          <select
                            className="premium-input"
                            value={testCategory}
                            onChange={e => setTestCategory(e.target.value)}
                            style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                          >
                            {testCategories.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Contact Method</label>
                          <select
                            className="premium-input"
                            value={preferredContact}
                            onChange={e => setPreferredContact(e.target.value)}
                            style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                          >
                            <option value="Email">Email</option>
                            <option value="Phone">Phone Call</option>
                            <option value="WhatsApp">WhatsApp</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Reason for Test Request / Symptoms</label>
                        <textarea
                          className="premium-textarea"
                          value={reason}
                          onChange={e => setReason(e.target.value)}
                          placeholder="Describe symptoms, family health histories, or reasons for requesting this genomic screening panel..."
                        ></textarea>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Referral Doctor / Hospital Details (Optional)</label>
                        <textarea
                          className="premium-textarea"
                          value={referralDetails}
                          onChange={e => setReferralDetails(e.target.value)}
                          placeholder="Provide the name, specialization, or clinic details of the physician who recommended genetic testing..."
                        ></textarea>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <div className="flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', border: '1px solid rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px', transform: 'none', boxShadow: 'none' }}>
                          <div className="flex-row align-start gap-3 w-full" style={{ display: 'flex' }}>
                            <input 
                              type="checkbox" 
                              id="test-consent-box"
                              checked={consent}
                              onChange={e => setConsent(e.target.checked)}
                              style={{ marginTop: '4px', minWidth: '18px', width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--secondary)', position: 'relative', zIndex: 10 }}
                            />
                            <label htmlFor="test-consent-box" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5', userSelect: 'none' }}>
                              I consent to The Gene Clinic using these details to evaluate assay suitability. I understand that a clinical coordinator will contact me to coordinate payment and sample routing. *
                            </label>
                          </div>
                          {validationErrors.consent && <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '8px' }}>{validationErrors.consent}</span>}
                        </div>

                        <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%' }}>
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                          >
                            {loading ? 'Submitting Request...' : 'Submit Test Request'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FORM 3: BOOK APPOINTMENT FOR GENETIC COUNSELING */}
                  {activeFormTab === 2 && (
                    <div className="flex-col gap-6">
                      {/* Section 1: Patient Details */}
                      <div>
                        <div className="form-section-title">
                          <Users size={18} className="text-secondary" /> 1. Patient Details
                        </div>
                        
                        <div className="grid grid-2" style={{ gap: '20px' }}>
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="patientName" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Full Name *</label>
                            <input
                              id="patientName"
                              name="patientName"
                              type="text"
                              className={`premium-input ${validationErrors.patientName ? 'invalid' : ''}`}
                              value={formData.patientName}
                              onChange={handleChange}
                              placeholder="e.g. Dilhan Perera"
                            />
                            {validationErrors.patientName && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.patientName}</span>}
                          </div>
                          
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="phone" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Phone Number *</label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="e.g. +94 77 123 4567"
                            />
                            {validationErrors.phone && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                          </div>
                        </div>

                        <div className="grid grid-2 mt-4" style={{ gap: '20px' }}>
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="email" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Email Address *</label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="e.g. dilhan.perera@example.com"
                            />
                            {validationErrors.email && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                          </div>
                          
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="age" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Age</label>
                            <input
                              id="age"
                              name="age"
                              type="number"
                              className={`premium-input ${validationErrors.age ? 'invalid' : ''}`}
                              value={formData.age}
                              onChange={handleChange}
                              placeholder="e.g. 34"
                            />
                            {validationErrors.age && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.age}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Consultation Details */}
                      <div>
                        <div className="form-section-title">
                          <Calendar size={18} className="text-accent" /> 2. Consultation Details
                        </div>

                        <div className="grid grid-3" style={{ gap: '20px' }}>
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="appointmentType" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Appointment Type *</label>
                            <select
                              id="appointmentType"
                              name="appointmentType"
                              className={`premium-input ${validationErrors.appointmentType ? 'invalid' : ''}`}
                              value={formData.appointmentType}
                              onChange={handleChange}
                              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                            >
                              <option value="" disabled>Select Type</option>
                              <option value="Genetic Counselling">Genetic Counselling</option>
                              <option value="Wellness Counselling">Wellness Counselling</option>
                              <option value="NIPT Counselling">NIPT Counselling</option>
                              <option value="Genetic Report Interpretation">Genetic Report Interpretation</option>
                              <option value="Precision Medicine Consultation">Precision Medicine Consultation</option>
                              <option value="Personalized Management Planning">Personalized Management Planning</option>
                              <option value="Nutrition & Wellness Consultation">Nutrition & Wellness Consultation</option>
                              <option value="Cancer Risk / Prevention Awareness">Cancer Risk / Prevention Awareness</option>
                              <option value="Non-Communicable Disease Prevention Guidance">Non-Communicable Disease Prevention Guidance</option>
                              <option value="Online Video Consultation">Online Video Consultation</option>
                              <option value="Other">Other</option>
                            </select>
                            {validationErrors.appointmentType && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.appointmentType}</span>}
                          </div>

                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="clinicLocation" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Clinic Location *</label>
                            <select
                              id="clinicLocation"
                              name="clinicLocation"
                              className={`premium-input ${validationErrors.clinicLocation ? 'invalid' : ''}`}
                              value={formData.clinicLocation}
                              onChange={handleChange}
                              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                            >
                              <option value="" disabled>Select Location</option>
                              <option value="Galle Clinic">Galle Clinic</option>
                              <option value="Online Consultation">Online Consultation</option>
                              <option value="Other / To be confirmed">Other / To be confirmed</option>
                            </select>
                            {validationErrors.clinicLocation && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.clinicLocation}</span>}
                          </div>

                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="preferredMode" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Mode *</label>
                            <select
                              id="preferredMode"
                              name="preferredMode"
                              className={`premium-input ${validationErrors.preferredMode ? 'invalid' : ''}`}
                              value={formData.preferredMode}
                              onChange={handleChange}
                              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                            >
                              <option value="" disabled>Select Mode</option>
                              <option value="In-person">In-person</option>
                              <option value="Online Video Consultation">Online Video Consultation</option>
                              <option value="Phone Call">Phone Call</option>
                              <option value="To be confirmed">To be confirmed</option>
                            </select>
                            {validationErrors.preferredMode && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.preferredMode}</span>}
                          </div>
                        </div>

                        <div className="grid grid-2 mt-4" style={{ gap: '20px' }}>
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="preferredDate" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Date *</label>
                            <input
                              id="preferredDate"
                              name="preferredDate"
                              type="date"
                              className={`premium-input ${validationErrors.preferredDate ? 'invalid' : ''}`}
                              value={formData.preferredDate}
                              onChange={handleChange}
                            />
                            {validationErrors.preferredDate && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.preferredDate}</span>}
                          </div>

                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="preferredTimeSlot" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Time Slot *</label>
                            <select
                              id="preferredTimeSlot"
                              name="preferredTimeSlot"
                              className={`premium-input ${validationErrors.preferredTimeSlot ? 'invalid' : ''}`}
                              value={formData.preferredTimeSlot}
                              onChange={handleChange}
                              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                            >
                              <option value="" disabled>Select Time</option>
                              <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                              <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                              <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                              <option value="To be confirmed">To be confirmed</option>
                            </select>
                            {validationErrors.preferredTimeSlot && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.preferredTimeSlot}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Reason for Consultation */}
                      <div>
                        <div className="form-section-title">
                          <Info size={18} className="text-secondary" /> 3. Consultation Goals
                        </div>

                        <div className="form-group flex-col" style={{ gap: '6px' }}>
                          <label htmlFor="reason" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Reason for Consultation *</label>
                          <textarea
                            id="reason"
                            name="reason"
                            className={`premium-textarea ${validationErrors.reason ? 'invalid' : ''}`}
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Describe symptoms, family diagnosis details, or genetic concerns you wish to review..."
                          ></textarea>
                          {validationErrors.reason && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.reason}</span>}
                        </div>

                        <div className="form-group flex-col mt-4" style={{ gap: '6px' }}>
                          <label htmlFor="message" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Message / Additional Notes (Optional)</label>
                          <textarea
                            id="message"
                            name="message"
                            className="premium-textarea"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Provide any additional logistical request details or details on clinic coordinate needs..."
                          ></textarea>
                        </div>
                      </div>

                      {/* Section 4: Report Upload */}
                      <div id="uploader-section">
                        <div className="form-section-title">
                          <Upload size={18} className="text-accent" /> 4. Clinical Report Uploads
                        </div>
                        
                        <p className="xsmall-text text-muted mb-4" style={{ lineHeight: '1.5' }}>
                          To optimize your session, please upload copies of relevant reports if available. Handled securely under clinical confidentiality guidelines.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="geneticReport" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Genetic Report (Optional)</label>
                            <input
                              id="geneticReport"
                              name="geneticReport"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="premium-input"
                              onChange={handleFileChange}
                              style={{ padding: '10px' }}
                            />
                            {formData.geneticReport && <span className="xsmall-text text-muted" style={{ fontWeight: 600 }}>Selected: {formData.geneticReport.name}</span>}
                            <span className="xsmall-text text-light" style={{ fontSize: '0.75rem' }}>PDF, JPG, PNG accepted</span>
                          </div>
                          
                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="medicalReport" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Medical Report (Optional)</label>
                            <input
                              id="medicalReport"
                              name="medicalReport"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="premium-input"
                              onChange={handleFileChange}
                              style={{ padding: '10px' }}
                            />
                            {formData.medicalReport && <span className="xsmall-text text-muted" style={{ fontWeight: 600 }}>Selected: {formData.medicalReport.name}</span>}
                            <span className="xsmall-text text-light" style={{ fontSize: '0.75rem' }}>PDF, JPG, PNG accepted</span>
                          </div>

                          <div className="form-group flex-col" style={{ gap: '6px' }}>
                            <label htmlFor="referralLetter" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Referral Letter (Optional)</label>
                            <input
                              id="referralLetter"
                              name="referralLetter"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="premium-input"
                              onChange={handleFileChange}
                              style={{ padding: '10px' }}
                            />
                            {formData.referralLetter && <span className="xsmall-text text-muted" style={{ fontWeight: 600 }}>Selected: {formData.referralLetter.name}</span>}
                            <span className="xsmall-text text-light" style={{ fontSize: '0.75rem' }}>Upload request sheets if available</span>
                          </div>
                        </div>
                      </div>

                      {/* Online Payment Integration Placeholder Banner */}
                      <div className="card flex-col align-start" style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.03)', borderColor: 'rgba(245, 158, 11, 0.15)', borderRadius: '18px', marginBottom: '24px' }}>
                        <div className="flex-row align-center gap-2 mb-2 text-gold" style={{ display: 'flex', alignItems: 'center', color: '#d97706' }}>
                          <Info size={18} />
                          <strong style={{ fontSize: '0.9rem', fontWeight: 700 }}>Online Payment Gateway Integration</strong>
                        </div>
                        <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                          Secure online credit card and mobile payment processing is currently in setup mode. Once your appointment slot is clinically confirmed by our Galle coordinator, you will receive a secure payment link via SMS or Email to complete booking validation.
                        </p>
                      </div>

                      {/* Section 5: Consent & Submit */}
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                        <div className="flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', border: '1px solid rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px', transform: 'none', boxShadow: 'none' }}>
                          <div className="flex-row-center text-accent mb-3" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)' }}>
                            <Shield size={16} />
                          </div>
                          <p className="xsmall-text text-muted" style={{ margin: '0 0 12px', lineHeight: '1.6' }}>
                            <strong>Privacy Note:</strong> Your uploaded records are secure and will be utilized solely to prep clinical session logs.
                          </p>
                          
                          <div className="flex-row align-start gap-3 w-full" style={{ display: 'flex' }}>
                            <input 
                              type="checkbox" 
                              id="consent-box"
                              name="consent"
                              checked={formData.consent}
                              onChange={handleChange}
                              style={{ marginTop: '4px', minWidth: '18px', width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--secondary)', position: 'relative', zIndex: 10 }}
                            />
                            <label htmlFor="consent-box" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5', userSelect: 'none' }}>
                              I confirm that the information provided is accurate and I consent to The Gene Clinic using these details and uploaded reports only for consultation preparation and communication. *
                            </label>
                          </div>
                          {validationErrors.consent && <span role="alert" style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '8px' }}>{validationErrors.consent}</span>}
                        </div>

                        <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%' }}>
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                          >
                            {loading ? 'Submitting Request...' : 'Submit Appointment Request'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </form>
              )}

            </div>

            {/* Sidebar Column */}
            <div className="sidebar-help-card flex-col gap-6" style={{ height: 'fit-content' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px' }}>Need help?</h3>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', margin: 0 }}>
                  Have questions about selecting the right consultation or screening package?
                </p>
              </div>

              <div className="flex-col gap-3">
                <div className="flex-row align-center gap-3" style={{ padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <Phone size={16} className="text-secondary" />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>Call Clinic</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0 }}>+94 70 191 7000</p>
                  </div>
                </div>
                
                <div className="flex-row align-center gap-3" style={{ padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <MessageSquare size={16} className="text-accent" />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>WhatsApp Inquiry</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0 }}>Available for queries</p>
                  </div>
                </div>
              </div>

              <div className="border-top pt-4">
                <ul className="flex-col gap-3 pl-4 text-muted xsmall-text" style={{ listStyleType: 'disc', lineHeight: '1.5' }}>
                  <li>Pre-test consultation is recommended before choosing exomes.</li>
                  <li>Upload reports ahead of scheduled timings to save clinic wait durations.</li>
                  <li>NIPT screening panels require specialized counseling interpretations.</li>
                </ul>
              </div>

              <div className="flex-col gap-2 mt-2">
                <a 
                  href="https://wa.me/94701917000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                  style={{ display: 'flex', gap: '8px', padding: '10px 16px', fontSize: '0.8rem', color: 'white', backgroundColor: '#25D366', borderColor: 'transparent' }}
                >
                  <MessageSquare size={14} /> WhatsApp Chat
                </a>
                <a 
                  href="tel:+94701917000"
                  className="btn btn-secondary w-full"
                  style={{ display: 'flex', gap: '8px', padding: '10px 16px', fontSize: '0.8rem', color: 'var(--text-main)' }}
                >
                  <Phone size={14} /> Call Now
                </a>
              </div>

              <div className="flex-col gap-2 mt-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <span className="xsmall-text text-muted font-bold" style={{ display: 'block', marginBottom: '8px' }}>Follow Us</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {/* TODO: Replace # with official social media URLs */}
                  <a href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Facebook</a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>YouTube</a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Instagram</a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>TikTok</a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>LinkedIn</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Security Footer */}
      <section className="section bg-secondary text-center" style={{ padding: '24px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container flex-row-center gap-2 justify-center text-muted" style={{ display: 'flex' }}>
          <Shield size={16} className="text-accent" />
          <p className="xsmall-text" style={{ margin: 0 }}>
            All reports are secure, encrypted, and handled confidentially in Galle clinical database systems.
          </p>
        </div>
      </section>

    </div>
  );
}
