import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export default function CallbackModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

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
        body: JSON.stringify({
          name,
          email: `${name.toLowerCase().replace(/\s+/g, '')}@callback-requested.com`,
          phone,
          subject: 'Callback Request',
          message: message || 'Please call me back regarding clinical genetics consultation.',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setMessage('');
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {success ? (
          <div className="modal-success text-center">
            <CheckCircle size={54} className="text-accent text-center-icon animate-bounce" />
            <h3 style={{ marginTop: '16px' }}>Request Submitted</h3>
            <p style={{ marginTop: '8px' }}>
              Thank you. Dr. Lahiru Prabodha or a clinic assistant will call you back shortly.
            </p>
            <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => { setSuccess(false); onClose(); }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Request a Call Back</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
              Leave your details below and a medical representative will contact you.
            </p>

            {error && (
              <div className="form-alert error-alert">
                <AlertCircle size={16} />
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
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dilhan Perera"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +94 77 123 4567"
              />
            </div>

            <div className="form-group">
              <label>Inquiry Details (Optional)</label>
              <textarea
                className="form-control"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe what you would like to discuss (e.g. Reproductive genetics, test report interpretation...)"
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
