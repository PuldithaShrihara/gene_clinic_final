import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Info, Lock, FileUp, Calendar } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      {/* Background DNA wave pattern */}
      <div className="bg-wave-lines"></div>

      <div className="footer-container">
        {/* Footer CTA Card */}
        <div className="footer-cta-card">
          <div className="footer-cta-content">
            <h2>Need help understanding a genetic report?</h2>
            <p>
              Book a consultation or upload your report for professional genetic interpretation.
            </p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/appointments?action=upload" className="btn btn-cta-upload">
              <FileUp size={16} /> Upload Report
            </Link>
            <Link to="/appointments" className="btn btn-cta-book">
              <Calendar size={16} /> Book Appointment
            </Link>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo" style={{ alignItems: 'flex-start' }}>
              <img src={logoImg} alt="The Gene Clinic Logo" className="footer-logo-image" style={{ height: '48px', width: 'auto', objectFit: 'contain', marginTop: '2px' }} />
              <div className="footer-logo-text">
                <span className="logo-title">The Gene Clinic</span>
                <span className="logo-tagline" style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '0.8rem', color: 'var(--accent-light)' }}>GenSek Health Private Limited</span>
                <span className="logo-doctor" style={{ color: '#ffffff', fontWeight: '600', marginTop: '6px', fontSize: '0.88rem' }}>Dr. L. B. Lahiru Prabodha</span>
                <span className="logo-doctor-title" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Clinical Geneticist and Genetic Counsellor</span>
              </div>
            </div>
            <p className="footer-desc">
              Specialist clinical genetics, genetic counselling, wellness genomics, NIPT, and genetic report interpretation led by Dr. Lahiru Prabodha.
            </p>
            {/* TODO: Replace # with official social media URLs */}
            <div className="footer-social-section" style={{ marginBottom: '24px' }}>
              <span className="logo-doctor-title" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>Follow Us</span>
              <div className="footer-social-links" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>Facebook</a>
                <a href="https://youtube.com/playlist?list=PLygxKE35blKLAZKG-fplSl-DRl18aRF4Y&si=SAy9S898bUTJAvhV" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>YouTube</a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>TikTok</a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>LinkedIn</a>
              </div>
            </div>
            <div className="footer-badges">
              <span className="footer-badge">Clinical Genetics</span>
              <span className="footer-badge">Genetic Counselling</span>
              <span className="footer-badge">Wellness Genomics</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Doctor</Link></li>
              <li><Link to="/clinic">The Gene Clinic</Link></li>
              <li><Link to="/packages">Test Packages</Link></li>
              <li><Link to="/blueprint">Wellness Blueprint</Link></li>
              <li><Link to="/nipt">NIPT Prenatal</Link></li>
              <li><Link to="/patient-registration">Patient / Client Registration</Link></li>
              <li><Link to="/faq">FAQ / Q & A</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link to="/services">Clinical Genetics</Link></li>
              <li><Link to="/services">Genetic Counselling</Link></li>
              <li><Link to="/services">Report Interpretation</Link></li>
              <li><Link to="/services">Precision Medicine</Link></li>
              <li><Link to="/services">Personalized Management</Link></li>
              <li><Link to="/services">Nutrition & Wellness</Link></li>
              <li><Link to="/services">Cancer & NCD Prevention</Link></li>
              <li><Link to="/services">Online Video Consult</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col contact-col">
            <h3>Contact</h3>
            <ul className="footer-contact-list">
              <li>
                <Phone size={16} className="contact-icon" />
                <div className="contact-details">
                  <a href="tel:+94701917000">+94 70 191 7000</a>
                  <a href="tel:+94777365212" className="sub-contact">+94 77 736 5212</a>
                </div>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <div className="contact-details">
                  <a href="mailto:thegeneclinic@gmail.com">thegeneclinic@gmail.com</a>
                  <a href="mailto:lahiruprabodha@med.ruh.ac.lk" className="sub-contact">lahiruprabodha@med.ruh.ac.lk</a>
                </div>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Galle, Sri Lanka</span>
              </li>
            </ul>
            <div className="footer-action-buttons">
              <a href="https://wa.me/94701917000" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={16} /> WhatsApp Chat
              </a>
              <a href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F" target="_blank" rel="noopener noreferrer" className="btn btn-facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook Page
              </a>
              <Link to="/appointments" className="btn btn-book-appt">
                <Calendar size={16} /> Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="footer-disclaimer" id="disclaimer">
          <div className="disclaimer-title-row">
            <Info size={16} className="disclaimer-icon" />
            <h4>Medical Disclaimer</h4>
          </div>
          <p>
            The information provided on this website is for educational and service guidance purposes only. It does not replace consultation, diagnosis, or treatment by a qualified healthcare professional. Genetic and wellness-related results should be interpreted with professional guidance.
          </p>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} The Gene Clinic / GenSek Health Private Limited. All rights reserved.
          </p>
          <div className="bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms-conditions">Terms & Conditions</Link>
            <span className="divider">|</span>
            <a href="#disclaimer">Medical Disclaimer</a>
            <span className="divider">|</span>
            <Link to="/admin" className="doctor-portal-link">
              <Lock size={12} /> Doctor Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
