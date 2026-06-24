import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <img src={logoImg} alt="The Gene Clinic Logo" className="logo-image" style={{ height: '110px', width: 'auto', objectFit: 'contain', margin: '-24px 0' }} />
          <div className="logo-text">
            <span className="logo-name" style={{ fontSize: '1.5rem', lineHeight: '1.1' }}>The Gene Clinic</span>
            <span className="logo-sub" style={{ fontSize: '0.8rem', textTransform: 'none', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>GenSek Health Private Limited</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>

            {/* About Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${location.pathname === '/about' || location.pathname === '/clinic' ? 'active' : ''}`} style={{ cursor: 'default' }}>
                About <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                <Link to="/about" className="dropdown-item">About Doctor</Link>
                <Link to="/clinic" className="dropdown-item">The Gene Clinic</Link>
              </div>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} style={{ cursor: 'default' }}>
                Services <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu" style={{ minWidth: '240px' }}>
                <Link to="/services" className="dropdown-item">Clinical Genetics</Link>
                <Link to="/services" className="dropdown-item">Wellness Counselling</Link>
                <Link to="/services" className="dropdown-item">Precision Medicine Guidance</Link>
                <Link to="/services" className="dropdown-item">Personalized Management</Link>
                <Link to="/services" className="dropdown-item">Nutrition & Wellness Guidance</Link>
                <Link to="/services" className="dropdown-item">Cancer & NCD Prevention</Link>
                <Link to="/services" className="dropdown-item">Online Video Consultation</Link>
              </div>
            </li>

            <li>
              <Link to="/blueprint" className={`nav-link ${location.pathname === '/blueprint' ? 'active' : ''}`}>
                Wellness Blueprint
              </Link>
            </li>

            {/* Resources Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${['/education', '/journey', '/research', '/articles', '/faq'].includes(location.pathname) ? 'active' : ''}`} style={{ cursor: 'default' }}>
                Resources <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                <Link to="/education" className="dropdown-item">Education Hub</Link>
                <Link to="/journey" className="dropdown-item">Patient Journey</Link>
                <Link to="/research" className="dropdown-item">Research</Link>
                <Link to="/articles" className="dropdown-item">Articles</Link>
                <Link to="/faq" className="dropdown-item">FAQ</Link>
              </div>
            </li>

            <li>
              <Link to="/nipt" className={`nav-link ${location.pathname === '/nipt' ? 'active' : ''}`}>
                NIPT
              </Link>
            </li>
            {/* More Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${['/request-genetic-test', '/patient-registration', '/partner-laboratories', '/reviews', '/contact'].includes(location.pathname) ? 'active' : ''}`} style={{ cursor: 'default' }}>
                More <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu" style={{ minWidth: '220px' }}>
                <Link to="/request-genetic-test" className="dropdown-item">Request Genetic Test</Link>
                <Link to="/patient-registration" className="dropdown-item">Patient Registration</Link>
                <Link to="/partner-laboratories" className="dropdown-item">Partner Laboratories</Link>
                <Link to="/reviews" className="dropdown-item">Client Reviews</Link>
                <Link to="/contact" className="dropdown-item">Contact Clinic</Link>
              </div>
            </li>
          </ul>
        </nav>

        {/* Desktop Header Actions */}
        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <Link to="/appointments" className="btn btn-primary btn-sm hide-tablet">
            Book Appointment
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with Grouped Items) */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} style={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
        <nav className="mobile-nav" style={{ paddingBottom: '40px' }}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu} className="mobile-nav-link">
                Home
              </Link>
            </li>

            <li className="mobile-nav-group-title">About</li>
            <li><Link to="/about" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>About Doctor</Link></li>
            <li><Link to="/clinic" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>The Gene Clinic</Link></li>
            <li className="mobile-nav-group-title">Services & Panels</li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>All Services</Link></li>
            <li><Link to="/packages" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Test Packages</Link></li>
            <li><Link to="/blueprint" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Wellness Blueprint</Link></li>
            <li><Link to="/nipt" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>NIPT Prenatal Guidance</Link></li>

            <li className="mobile-nav-group-title">Resources</li>
            <li><Link to="/education" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Education Hub</Link></li>
            <li><Link to="/journey" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Patient Journey</Link></li>
            <li><Link to="/research" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Research</Link></li>
            <li><Link to="/articles" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Articles</Link></li>
            <li><Link to="/faq" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>FAQ Accordion</Link></li>

            <li className="mobile-nav-group-title">Patient Portal & Connect</li>
            <li><Link to="/request-genetic-test" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Request Genetic Test</Link></li>
            <li><Link to="/patient-registration" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Patient Registration</Link></li>
            <li><Link to="/partner-laboratories" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Partner Laboratories</Link></li>
            <li><Link to="/reviews" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Client Reviews</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Contact Clinic</Link></li>

            <li className="mobile-nav-group-title">Follow Us</li>
            <li style={{ paddingLeft: '16px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {/* TODO: Replace # with official social media URLs */}
                <a href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Facebook</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>YouTube</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>TikTok</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>LinkedIn</a>
              </div>
            </li>
            <li className="mobile-drawer-cta" style={{ marginTop: '24px' }}>
              <Link to="/appointments" onClick={closeMenu} className="btn btn-primary w-full text-center">
                Book Appointment
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
