import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Make sure the Node server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">Contact Gateway</span>
          <h1 className="text-gradient">Contact The Gene Clinic</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            Get in touch to learn about test packages, NIPT collection details, or scheduling a consultation in Galle.
          </p>
        </div>
      </section>

      {/* Main Area */}
      <section className="section section-light">
        <div className="container grid grid-2">
          {/* Contact Details */}
          <div>
            <span className="badge badge-accent mb-4">GenSek Office</span>
            <h2>Our Contact Channels</h2>
            <p className="mt-4 mb-8">
              We look forward to addressing your questions. Get in touch with our clinic coordinator via phone, email, or WhatsApp.
            </p>

            <div className="contact-info-cards grid gap-4">
              <div className="card card-glass flex-row gap-4 align-start" style={{ padding: '20px' }}>
                <MapPin size={22} className="text-accent flex-shrink-0" />
                <div>
                  <h4>Galle Clinic Location</h4>
                  <p className="small-text mt-1 text-muted">
                    GenSek Health Pvt Ltd, Galle, Sri Lanka.
                  </p>
                </div>
              </div>

              <div className="card card-glass flex-row gap-4 align-start" style={{ padding: '20px' }}>
                <Clock size={22} className="text-gold flex-shrink-0" />
                <div>
                  <h4>Operating Hours</h4>
                  <p className="small-text mt-1 text-muted">
                    Monday - Friday: 09:00 AM - 05:00 PM<br />
                    Saturday: 09:00 AM - 01:00 PM (Sunday Closed)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-2 gap-4">
              <a href="tel:+94701917000" className="btn btn-secondary text-center">
                <Phone size={16} /> +94 70 191 7000
              </a>
              <a href="mailto:thegeneclinic@gmail.com" className="btn btn-secondary text-center" style={{ fontSize: '0.85rem' }}>
                <Mail size={16} /> thegeneclinic@gmail.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="card">
            {success ? (
              <div className="text-center py-12">
                <CheckCircle2 size={54} className="text-accent text-center-icon animate-bounce" />
                <h3 className="mt-6">Message Sent</h3>
                <p className="mt-2">
                  Thank you. Dr. Lahiru Prabodha or his staff will review your message and reply via email or phone.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-primary mt-6">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="mb-4">Send a Message</h3>
                
                {error && (
                  <div className="form-alert error-alert mb-4">
                    <ShieldAlert size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Dilhan Perera"
                  />
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. dilhan@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. +94 77 123 4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select
                    className="form-control"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Pricing & Packages">Pricing & Packages</option>
                    <option value="Lab Test Logistics">Lab Test Logistics</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write details of your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-4"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map Mock */}
      <section className="section bg-secondary text-center">
        <div className="container">
          <span className="badge badge-gold mb-2">Location Map</span>
          <h2>Find Us in Galle</h2>
          <div className="map-placeholder-box mt-6 card">
            <MapPin size={48} className="text-gold text-center-icon mb-4 animate-bounce" />
            <h3>GenSek Health Pvt Ltd Map Placeholder</h3>
            <p className="small-text mt-2">
              Galle, Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency disclaimer */}
      <section className="section bg-secondary border-top">
        <div className="container">
          <div className="card card-gold bg-primary flex-row gap-4 align-start" style={{ borderColor: 'var(--gold)' }}>
            <ShieldAlert className="text-gold flex-shrink-0" size={28} />
            <div>
              <h4 style={{ color: 'var(--gold)' }}>Emergency Disclaimer</h4>
              <p className="small-text mt-2 text-muted">
                The Gene Clinic is a clinical genetics specialty facility. We do not provide trauma, critical care, or general emergency medicine services. For urgent, life-threatening medical concerns, please contact national emergency services or proceed immediately to the nearest hospital emergency room.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
