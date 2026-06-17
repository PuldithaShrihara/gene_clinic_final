import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle } from 'lucide-react';

export default function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta">
      <a href="tel:+94701917000" className="btn btn-secondary flex-1" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
        <Phone size={16} />
        <span>Call</span>
      </a>
      <a href="https://wa.me/94701917000" target="_blank" rel="noopener noreferrer" className="btn btn-accent flex-1" style={{ padding: '8px 12px', fontSize: '0.85rem', backgroundColor: '#25D366', color: 'white', borderColor: 'transparent' }}>
        <MessageCircle size={16} />
        <span>WhatsApp</span>
      </a>
      <Link to="/appointments" className="btn btn-primary flex-1" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
        <Calendar size={16} />
        <span>Book</span>
      </Link>
    </div>
  );
}
