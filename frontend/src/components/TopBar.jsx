import React from 'react';
import { Phone, Mail, MessageCircle, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar({ onOpenCallbackModal }) {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-contact">
          <a href="tel:+94701917000" className="contact-item">
            <Phone size={13} />
            <span>+94 70 191 7000</span>
          </a>
          <a href="tel:+94777365212" className="contact-item hide-mobile">
            <span>/ +94 77 736 5212</span>
          </a>
          <a href="mailto:thegeneclinic@gmail.com" className="contact-item hide-tablet">
            <Mail size={13} />
            <span>thegeneclinic@gmail.com</span>
          </a>
          <a href="https://wa.me/94701917000" target="_blank" rel="noopener noreferrer" className="contact-item whatsapp-color">
            <MessageCircle size={13} />
            <span>WhatsApp</span>
          </a>
        </div>
        <div className="top-bar-ctas">
          <button onClick={onOpenCallbackModal} className="top-bar-btn btn-callback">
            Request Callback
          </button>
          <Link to="/appointments?action=upload" className="top-bar-btn btn-callback" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <FileUp size={12} />
            <span>Upload Report</span>
          </Link>
          <Link to="/appointments" className="top-bar-btn btn-book">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
