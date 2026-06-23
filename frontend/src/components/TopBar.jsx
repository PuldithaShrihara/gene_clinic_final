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
      </div>
    </div>
  );
}
