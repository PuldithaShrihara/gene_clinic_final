import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, AlertCircle, Shield, Upload, Phone, Mail } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function PatientRegistration() {
  // Form fields state
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [reason, setReason] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [uploadedReportName, setUploadedReportName] = useState('');
  const [consent, setConsent] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!reason.trim()) errors.reason = 'Reason for Registration is required';
    if (!consent) errors.consent = 'You must accept the consent declaration to submit';
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
      const response = await fetch(`${API_BASE_URL}/api/patient-registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dob,
          age,
          gender,
          phone,
          email,
          address,
          nic,
          emergencyContactName,
          emergencyContactNumber,
          reason,
          medicalCondition,
          currentMedications,
          uploadedReports: uploadedReportName ? [uploadedReportName] : [],
          consent
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setDob('');
        setAge('');
        setGender('Male');
        setPhone('');
        setEmail('');
        setAddress('');
        setNic('');
        setEmergencyContactName('');
        setEmergencyContactNumber('');
        setReason('');
        setMedicalCondition('');
        setCurrentMedications('');
        setUploadedReportName('');
        setConsent(false);
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit patient registration.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please check your network connection.');
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
    <div className="registration-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* CSS style overrides for page alignments */}
      <style>{`
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
          min-height: 100px;
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

        @media (max-width: 992px) {
          .registration-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Patient Portal</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Patient / Client Registration
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Register your details to support a smoother consultation, genetic testing, report interpretation, and follow-up experience.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Data Confidentiality</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                Patient files are accessed strictly by clinical staff and genetics specialists. All details are kept secure under clinical privacy policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Content */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="registration-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '32px', alignItems: 'start' }}>
            
            <div className="card" style={{ padding: '40px', position: 'relative', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {success ? (
                /* Success Card */
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Registration Successful</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '16px auto 32px', lineHeight: '1.7' }}>
                    Patient / client registration submitted successfully. Our team will contact you if further information is required.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Register Another Profile
                  </button>
                </div>
              ) : (
                /* Form Block */
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px' }}>Registration Intake</h2>
                    <p className="small-text text-muted">
                      Patient / client registration helps The Gene Clinic by GenSek Health Private Limited maintain accurate information before counselling, sample collection, genetic testing, or wellness guidance.
                    </p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* Section 1: Demographics */}
                  <div>
                    <div className="form-section-title">
                      <ClipboardCheck size={18} className="text-secondary" /> 1. Demographics & Contacts
                    </div>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Full Name *</label>
                        <input
                          type="text"
                          className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Nadeesha Silva"
                        />
                        {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Date of Birth</label>
                        <input
                          type="date"
                          className="premium-input"
                          value={dob}
                          onChange={e => setDob(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-3 mt-4" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Age</label>
                        <input
                          type="number"
                          className="premium-input"
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          placeholder="e.g. 29"
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Gender</label>
                        <select
                          className="premium-input"
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>NIC / Passport Number (Optional)</label>
                        <input
                          type="text"
                          className="premium-input"
                          value={nic}
                          onChange={e => setNic(e.target.value)}
                          placeholder="e.g. 978546123V"
                        />
                      </div>
                    </div>

                    <div className="grid grid-2 mt-4" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Phone Number *</label>
                        <input
                          type="tel"
                          className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="e.g. +94 77 123 4567"
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
                          placeholder="e.g. nadeesha.silva@example.com"
                        />
                        {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group flex-col mt-4" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Address</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Street Address, City"
                      />
                    </div>
                  </div>

                  {/* Section 2: Emergency Contacts */}
                  <div>
                    <div className="form-section-title">
                      <ClipboardCheck size={18} className="text-accent" /> 2. Emergency Contacts
                    </div>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Emergency Contact Name</label>
                        <input
                          type="text"
                          className="premium-input"
                          value={emergencyContactName}
                          onChange={e => setEmergencyContactName(e.target.value)}
                          placeholder="e.g. Amara Silva (Spouse)"
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Emergency Contact Number</label>
                        <input
                          type="tel"
                          className="premium-input"
                          value={emergencyContactNumber}
                          onChange={e => setEmergencyContactNumber(e.target.value)}
                          placeholder="e.g. +94 77 987 6543"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Clinical Background */}
                  <div>
                    <div className="form-section-title">
                      <ClipboardCheck size={18} className="text-secondary" /> 3. Medical Background
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Reason for Registration *</label>
                      <textarea
                        className={`premium-textarea ${validationErrors.reason ? 'invalid' : ''}`}
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="State primary genetic queries, wellness program interests, or testing requests..."
                      ></textarea>
                      {validationErrors.reason && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.reason}</span>}
                    </div>

                    <div className="form-group flex-col mt-4" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Existing Medical Condition (Optional)</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={medicalCondition}
                        onChange={e => setMedicalCondition(e.target.value)}
                        placeholder="List diagnosed conditions or chronic illnesses..."
                      />
                    </div>

                    <div className="form-group flex-col mt-4" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Current Medications (Optional)</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={currentMedications}
                        onChange={e => setCurrentMedications(e.target.value)}
                        placeholder="List current prescription items or biological supplements..."
                      />
                    </div>
                  </div>

                  {/* Section 4: File Uploader */}
                  <div>
                    <div className="form-section-title">
                      <Upload size={18} className="text-accent" /> 4. Previous Medical Reports
                    </div>
                    <FileUploader 
                      label="Upload Previous Reports (Optional)"
                      helper="PDF, JPG, PNG accepted"
                      fileName={uploadedReportName}
                      setFileName={setUploadedReportName}
                      themeColor="var(--secondary)"
                    />
                  </div>

                  {/* Section 5: Consent Declaration */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div className="card flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px' }}>
                      <div className="flex-row align-start gap-3 w-full" style={{ display: 'flex' }}>
                        <input 
                          type="checkbox" 
                          id="intake-consent-box"
                          checked={consent}
                          onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="intake-consent-box" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5' }}>
                          I confirm that the information provided is accurate and consent to The Gene Clinic / GenSek Health Private Limited using this information for appointment coordination, counselling, testing support, and follow-up communication. *
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
                        {loading ? 'Registering Profile...' : 'Register'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Information Column */}
            <div className="flex-col gap-6">
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>Registration Assistance</h3>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '16px' }}>
                  Intake profiles are processed securely by GenSek Health clinical coordinators. If you have questions during registration, feel free to contact us:
                </p>
                <div className="flex-col gap-4">
                  <div className="flex-row align-center gap-3">
                    <Phone size={16} className="text-secondary" />
                    <div>
                      <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>Phone Inquiries</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0 }}>+94 70 191 7000</p>
                    </div>
                  </div>
                  <div className="flex-row align-center gap-3">
                    <Mail size={16} className="text-accent" />
                    <div>
                      <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>Email Support</h5>
                      <p className="xsmall-text text-muted" style={{ margin: 0 }}>thegeneclinic@gmail.com</p>
                    </div>
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
