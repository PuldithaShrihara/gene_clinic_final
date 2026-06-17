import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Dna, ChevronDown } from 'lucide-react';

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
          <Dna className="logo-icon animate-pulse" size={26} />
          <div className="logo-text">
            <span className="logo-name">Dr. Lahiru Prabodha</span>
            <span className="logo-sub">The Gene Clinic</span>
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
              <div className="dropdown-menu">
                <Link to="/services" className="dropdown-item">Clinical Genetics</Link>
                <Link to="/services" className="dropdown-item">Genetic Counselling</Link>
                <Link to="/services" className="dropdown-item">Genetic Report Interpretation</Link>
                <Link to="/services" className="dropdown-item">Wellness Genomics</Link>
                <Link to="/nipt" className="dropdown-item">NIPT / Prenatal Screening</Link>
                <Link to="/services" className="dropdown-item">Sequencing & Panels</Link>
              </div>
            </li>

            <li>
              <Link to="/packages" className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`}>
                Test Packages
              </Link>
            </li>

            <li>
              <Link to="/blueprint" className={`nav-link ${location.pathname === '/blueprint' ? 'active' : ''}`}>
                Wellness Blueprint
              </Link>
            </li>

            <li>
              <Link to="/nipt" className={`nav-link ${location.pathname === '/nipt' ? 'active' : ''}`}>
                NIPT
              </Link>
            </li>

            {/* Resources Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${location.pathname === '/journey' || location.pathname === '/research' || location.pathname === '/articles' ? 'active' : ''}`} style={{ cursor: 'default' }}>
                Resources <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                <Link to="/journey" className="dropdown-item">Patient Journey</Link>
                <Link to="/research" className="dropdown-item">Research</Link>
                <Link to="/articles" className="dropdown-item">Articles</Link>
              </div>
            </li>

            <li>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
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
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul>
            <li>
              <Link to="/" onClick={closeMenu} className="mobile-nav-link">
                Home
              </Link>
            </li>

            <li className="mobile-nav-group-title">About</li>
            <li><Link to="/about" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>About Doctor</Link></li>
            <li><Link to="/clinic" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>The Gene Clinic</Link></li>

            <li className="mobile-nav-group-title">Services</li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Genetic Services</Link></li>
            <li><Link to="/packages" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Test Packages</Link></li>
            <li><Link to="/blueprint" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Wellness Blueprint</Link></li>
            <li><Link to="/nipt" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>NIPT Prenatal</Link></li>

            <li className="mobile-nav-group-title">Resources</li>
            <li><Link to="/journey" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Patient Journey</Link></li>
            <li><Link to="/research" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Research</Link></li>
            <li><Link to="/articles" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.95rem' }}>Articles</Link></li>

            <li className="mobile-nav-group-title">Connect</li>
            <li>
              <Link to="/contact" onClick={closeMenu} className="mobile-nav-link">
                Contact
              </Link>
            </li>
            <li className="mobile-drawer-cta">
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
