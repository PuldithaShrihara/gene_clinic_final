import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, CheckCircle2, AlertCircle, Upload, Shield, Info } from 'lucide-react';

export default function Appointments() {
  const queryLocation = useLocation();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [apptType, setApptType] = useState('Clinical genetics consultation');
  const [clinicLocation, setClinicLocation] = useState('Galle Clinic');
  const [mode, setMode] = useState('In-person');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 12:00 PM (Morning)');
  
  // Double report uploaders state
  const [geneticReportName, setGeneticReportName] = useState('');
  const [medicalReportName, setMedicalReportName] = useState('');
  
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(queryLocation.search);
    const typeParam = params.get('type');
    const actionParam = params.get('action');
    if (typeParam) {
      setApptType(typeParam);
    }
    
    // Auto scroll to uploader if action=upload is in URL
    if (actionParam === 'upload') {
      const uploaderElem = document.getElementById('uploader-section');
      if (uploaderElem) {
        uploaderElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [queryLocation]);

  const handleGeneticReportChange = (e) => {
    const file = e.target.files[0];
    if (file) setGeneticReportName(file.name);
  };

  const handleMedicalReportChange = (e) => {
    const file = e.target.files[0];
    if (file) setMedicalReportName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setError('You must consent to the medical privacy disclosure to book an appointment.');
      return;
    }

    setLoading(true);
    setError('');

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
          reason,
          date,
          timeSlot,
          geneticReport: geneticReportName || null,
          medicalReport: medicalReportName || null,
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
        setDate('');
        setGeneticReportName('');
        setMedicalReportName('');
        setConsent(false);
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

  return (
    <div className="appointments-page animate-fade-in">
      {/* Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">GenSek Health Scheduling</span>
          <h1 className="text-gradient">Book an Appointment / Upload Reports</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            Book in-person sessions in Galle, or arrange a secure online tele-genetics consultation.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="card card-accent">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle2 size={64} className="text-accent text-center-icon animate-bounce" />
                <h2 className="mt-6">Request Submitted Successfully</h2>
                <p className="mt-4">
                  Thank you for booking with The Gene Clinic / GenSek Health. We will review your uploaded files and contact you shortly to confirm your consultation schedule.
                </p>
                <div className="mt-8">
                  <button onClick={() => setSuccess(false)} className="btn btn-primary">
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="mb-2">Appointment Request</h2>
                <p className="small-text mb-8">
                  Complete the fields below to schedule a session or dispatch clinical reports.
                </p>

                {error && (
                  <div className="form-alert error-alert mb-6">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Patient Info */}
                <div className="form-group">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Dilhan Perera"
                  />
                </div>

                <div className="grid grid-3">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. +94 77 123 4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. dilhan@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Patient Age *</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      value={age}
                      onChange={e => setAge(e.target.value)}
                      placeholder="e.g. 35"
                    />
                  </div>
                </div>

                <div className="grid grid-3 border-bottom pb-4 mb-4" style={{ gridTemplateColumns: '1.2fr 1fr 0.8fr' }}>
                  <div className="form-group">
                    <label>Appointment Type *</label>
                    <select
                      className="form-control"
                      value={apptType}
                      onChange={e => setApptType(e.target.value)}
                    >
                      <option value="Clinical genetics consultation">Clinical genetics consultation</option>
                      <option value="Genetic counselling">Genetic counselling</option>
                      <option value="Wellness genomics consultation">Wellness genomics consultation</option>
                      <option value="Genetic report interpretation">Genetic report interpretation</option>
                      <option value="NIPT consultation">NIPT consultation</option>
                      <option value="Reproductive genetics consultation">Reproductive genetics consultation</option>
                      <option value="Family risk assessment">Family risk assessment</option>
                      <option value="Sequencing / clinical panel consultation">Sequencing / clinical panel consultation</option>
                      <option value="Corporate / academic inquiry">Corporate / academic inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Clinic Location *</label>
                    <select
                      className="form-control"
                      value={clinicLocation}
                      onChange={e => setClinicLocation(e.target.value)}
                    >
                      <option value="Galle Clinic">Galle Office</option>
                      <option value="Colombo Clinic">Colombo Clinic sessions</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Mode *</label>
                    <select
                      className="form-control"
                      value={mode}
                      onChange={e => setMode(e.target.value)}
                    >
                      <option value="In-person">In-person</option>
                      <option value="Online">Online Session</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-2 border-bottom pb-4 mb-4">
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time Slot *</label>
                    <select
                      className="form-control"
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                    >
                      <option value="09:00 AM - 12:00 PM (Morning)">09:00 AM - 12:00 PM (Morning)</option>
                      <option value="02:00 PM - 05:00 PM (Afternoon)">02:00 PM - 05:00 PM (Afternoon)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Consultation / Symptoms *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    required
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Describe symptoms, family diagnosis details, or specific genetic panels you wish to discuss..."
                  ></textarea>
                </div>

                {/* Double Report Uploader section */}
                <div className="uploader-section border-top pt-4 mt-6" id="uploader-section">
                  <h4 className="mb-2">Upload Clinical Files</h4>
                  <p className="xsmall-text text-muted mb-4">
                    Please upload any relevant documents if available. Supported formats include: <strong>Genetic reports</strong>, <strong>Lab reports</strong>, <strong>Medical history</strong>, <strong>Family history</strong>, <strong>Prescriptions</strong>, and <strong>Referral letters</strong>.
                  </p>
                  
                  {/* Privacy Alert */}
                  <div className="form-alert error-alert mb-4" style={{ backgroundColor: 'rgba(0,180,216,0.05)', borderColor: 'rgba(0,180,216,0.15)', color: 'var(--text-main)' }}>
                    <Info size={16} className="text-secondary" />
                    <span className="xsmall-text">
                      <strong>Privacy Notice:</strong> All uploaded reports are used only for consultation preparation and will be handled confidentially under HIPAA guidelines.
                    </span>
                  </div>

                  <div className="grid grid-2 gap-4">
                    {/* Uploader 1: Genetic Report */}
                    <div className="form-group">
                      <label className="small-text">Upload Genetic Report (Optional)</label>
                      <div className="file-upload-wrapper form-control">
                        <Upload size={14} className="text-accent" />
                        <span className="xsmall-text text-limit-3">{geneticReportName || 'Select DNA, Microarray or sequencing report...'}</span>
                        <input
                          type="file"
                          className="file-input-hidden"
                          onChange={handleGeneticReportChange}
                          accept=".pdf,.jpg,.png"
                        />
                      </div>
                    </div>

                    {/* Uploader 2: Medical History/Referrals */}
                    <div className="form-group">
                      <label className="small-text">Upload Medical History / Referral (Optional)</label>
                      <div className="file-upload-wrapper form-control">
                        <Upload size={14} className="text-gold" />
                        <span className="xsmall-text text-limit-3">{medicalReportName || 'Select prescriptions, referrals or blood reports...'}</span>
                        <input
                          type="file"
                          className="file-input-hidden"
                          onChange={handleMedicalReportChange}
                          accept=".pdf,.jpg,.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="form-group checkbox-group mt-6">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                  />
                  <label htmlFor="consent-check" className="checkbox-label">
                    I consent to sharing my clinical records and medical history. I understand that prenatal screenings and genetic tests are subject to strict clinical confidentiality guidelines. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-6"
                >
                  {loading ? 'Submitting Request...' : 'Submit Appointment Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <section className="section bg-secondary text-center py-6">
        <div className="container flex-row-center gap-2 justify-center text-muted">
          <Shield size={16} className="text-accent" />
          <p className="xsmall-text">
            All reports are secure, encrypted, and handled confidentially in Galle clinical database systems.
          </p>
        </div>
      </section>
    </div>
  );
}
