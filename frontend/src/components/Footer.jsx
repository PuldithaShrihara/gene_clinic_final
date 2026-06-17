import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Info, Lock, FileUp, Calendar, Dna } from 'lucide-react';

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
            <div className="footer-logo">
              <Dna className="footer-logo-icon" size={24} />
              <div className="footer-logo-text">
                <span className="logo-title">The Gene Clinic</span>
                <span className="logo-doctor">Dr. Lahiru Prabodha</span>
                <span className="logo-tagline">GenSek Health Pvt Ltd</span>
              </div>
            </div>
            <p className="footer-desc">
              Specialist clinical genetics, genetic counselling, wellness genomics, NIPT, and genetic report interpretation led by Dr. Lahiru Prabodha.
            </p>
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
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Test Packages</Link></li>
              <li><Link to="/blueprint">Wellness Blueprint</Link></li>
              <li><Link to="/nipt">NIPT</Link></li>
              <li><Link to="/journey">Patient Journey</Link></li>
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
              <li><Link to="/blueprint">Wellness Genomics</Link></li>
              <li><Link to="/nipt">NIPT</Link></li>
              <li><Link to="/services">Whole Exome Sequencing</Link></li>
              <li><Link to="/services">Whole Genome Sequencing</Link></li>
              <li><Link to="/services">Clinical Panels</Link></li>
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
            The information on this website is for educational and appointment information purposes only. It does not replace consultation with a qualified medical professional. Genetic testing, wellness genomics, and prenatal screening results should be interpreted by a qualified healthcare professional.
          </p>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} The Gene Clinic / GenSek Health Pvt Ltd. All rights reserved.
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
