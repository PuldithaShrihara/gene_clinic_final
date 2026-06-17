import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  Laptop
} from 'lucide-react';

export default function Appointments() {
  const queryLocation = useLocation();
  
  // Patient details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  // Consultation details state
  const [apptType, setApptType] = useState('Clinical genetics consultation');
  const [clinicLocation, setClinicLocation] = useState('Galle Clinic');
  const [mode, setMode] = useState('In-person');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 12:00 PM (Morning)');
  
  // Reason and message notes
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  
  // Files upload names
  const [geneticReportName, setGeneticReportName] = useState('');
  const [medicalReportName, setMedicalReportName] = useState('');
  const [referralReportName, setReferralReportName] = useState('');
  
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Active validation highlights
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
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

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Patient Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!age.trim()) errors.age = 'Patient Age is required';
    if (!reason.trim()) errors.reason = 'Reason for Consultation is required';
    if (!consent) errors.consent = 'You must consent to the medical privacy disclosure';
    
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

    // Prepare combined values for backend compatibility
    const combinedReason = message.trim() 
      ? `${reason}\n\nAdditional Notes: ${message}` 
      : reason;

    // Combine medical report and referral letter filenames if both are provided
    const combinedMedicalReport = medicalReportName && referralReportName
      ? `${medicalReportName}, ${referralReportName}`
      : (medicalReportName || referralReportName || null);

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          age,
          appointmentType: apptType,
          location: clinicLocation,
          mode,
          reason: combinedReason,
          date,
          timeSlot,
          geneticReport: geneticReportName || null,
          medicalReport: combinedMedicalReport,
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
        setMessage('');
        setDate('');
        setGeneticReportName('');
        setMedicalReportName('');
        setReferralReportName('');
        setConsent(false);
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to request appointment.');
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
                GenSek Health Scheduling
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Book an Appointment or Upload Reports
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '640px', marginBottom: '24px' }}>
                Book an in-person consultation in Galle or request secure online genetic counselling and report interpretation.
              </p>
              
              {/* Trust Badges */}
              <div className="flex-row gap-x-6 gap-y-2 flex-wrap text-muted" style={{ display: 'flex' }}>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">🛡️ Secure report upload</span>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">💻 Online or in-person</span>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">🩺 Genetic counselling</span>
                <span className="xsmall-text flex-row align-center gap-1 font-bold">📊 Professional results</span>
              </div>
            </div>

            {/* Right Column Summary card */}
            <div className="card card-glass flex-col" style={{ padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Data Confidentiality</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                All genetic data files and report uploads are processed securely. Information is released only to accredited medical coordinators under strict clinical privacy guidelines.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Main Request Form Section */}
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
              
              {success ? (
                /* Success State Card */
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent text-center-icon mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px' }}>Request Submitted</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>
                    Your request has been submitted. The clinic team will review your details and uploaded files, and contact you shortly to confirm your consultation.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                /* Main Appointment Form */
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-main)' }}>Appointment Request</h2>
                    <p className="small-text text-muted" style={{ margin: 0 }}>
                      Complete the details below so the clinic can review your request and guide you to the most suitable consultation.
                    </p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* Section 1: Patient Details */}
                  <div>
                    <div className="form-section-title">
                      <Users size={18} className="text-secondary" /> 1. Patient Details
                    </div>
                    
                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Full Name *</label>
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

                    <div className="grid grid-2 mt-4" style={{ gap: '20px' }}>
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
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Age *</label>
                        <input
                          type="number"
                          className={`premium-input ${validationErrors.age ? 'invalid' : ''}`}
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          placeholder="e.g. 34"
                        />
                        {validationErrors.age && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.age}</span>}
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
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Appointment Type *</label>
                        <select
                          className="premium-input"
                          value={apptType}
                          onChange={e => setApptType(e.target.value)}
                          style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                        >
                          <option value="Clinical genetics consultation">Clinical genetics consultation</option>
                          <option value="Genetic counselling">Genetic counselling</option>
                          <option value="Genetic report interpretation">Genetic report interpretation</option>
                          <option value="Wellness genomics consultation">Wellness genomics consultation</option>
                          <option value="NIPT consultation">NIPT consultation</option>
                          <option value="Reproductive genetics consultation">Reproductive genetics consultation</option>
                          <option value="Family risk assessment">Family risk assessment</option>
                          <option value="Sequencing / clinical panel consultation">Sequencing / clinical panel consultation</option>
                          <option value="Corporate / academic inquiry">Corporate / academic inquiry</option>
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Clinic Location *</label>
                        <select
                          className="premium-input"
                          value={clinicLocation}
                          onChange={e => setClinicLocation(e.target.value)}
                          style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                        >
                          <option value="Galle Clinic">Galle Clinic</option>
                          <option value="Online Consultation">Online Consultation</option>
                          <option value="Other / To be confirmed">Other / To be confirmed</option>
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Mode *</label>
                        <select
                          className="premium-input"
                          value={mode}
                          onChange={e => setMode(e.target.value)}
                          style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                        >
                          <option value="In-person">In-person</option>
                          <option value="Online">Online</option>
                          <option value="Phone call">Phone call</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-2 mt-4" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Date</label>
                        <input
                          type="date"
                          className="premium-input"
                          value={date}
                          onChange={e => setDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Time Slot</label>
                        <select
                          className="premium-input"
                          value={timeSlot}
                          onChange={e => setTimeSlot(e.target.value)}
                          style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px' }}
                        >
                          <option value="09:00 AM - 12:00 PM (Morning)">09:00 AM - 12:00 PM (Morning)</option>
                          <option value="02:00 PM - 05:00 PM (Afternoon)">02:00 PM - 05:00 PM (Afternoon)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Reason for Consultation */}
                  <div>
                    <div className="form-section-title">
                      <Info size={18} className="text-secondary" /> 3. Consultation Goals
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Reason for Consultation *</label>
                      <textarea
                        className={`premium-textarea ${validationErrors.reason ? 'invalid' : ''}`}
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Describe symptoms, family diagnosis details, or genetic concerns you wish to review..."
                      ></textarea>
                      {validationErrors.reason && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.reason}</span>}
                    </div>

                    <div className="form-group flex-col mt-4" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Message / Additional Notes (Optional)</label>
                      <textarea
                        className="premium-textarea"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Provide any additional logistical request details or details on clinic coordinate needs..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Section 4: Report Upload */}
                  <div id="uploader-section">
                    <div className="form-section-title">
                      <Upload size={18} className="text-accent" style={{ transform: 'rotate(0deg)' }} /> 4. Clinical Report Uploads
                    </div>
                    
                    <p className="xsmall-text text-muted mb-4" style={{ lineHeight: '1.5' }}>
                      To optimize your session, please upload copies of relevant reports if available. Handled securely under clinical confidentiality guidelines.
                    </p>

                    <div className="grid grid-3" style={{ gap: '20px' }}>
                      <FileUploader 
                        label="Genetic Report (Optional)"
                        helper="PDF, JPG, PNG accepted"
                        fileName={geneticReportName}
                        setFileName={setGeneticReportName}
                        themeColor="var(--secondary)"
                      />
                      
                      <FileUploader 
                        label="Medical Report (Optional)"
                        helper="PDF, JPG, PNG accepted"
                        fileName={medicalReportName}
                        setFileName={setMedicalReportName}
                        themeColor="var(--accent)"
                      />

                      <FileUploader 
                        label="Referral Letter (Optional)"
                        helper="Upload request sheets if available"
                        fileName={referralReportName}
                        setFileName={setReferralReportName}
                        themeColor="var(--gold)"
                      />
                    </div>
                  </div>

                  {/* Section 5: Consent & Submit */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div className="card flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px' }}>
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
                          checked={consent}
                          onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="consent-box" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5' }}>
                          I confirm that the information provided is accurate and I consent to The Gene Clinic using these details and uploaded reports only for consultation preparation and communication. *
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
                        {loading ? 'Submitting Request...' : 'Submit Appointment Request'}
                      </button>
                    </div>
                  </div>

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
