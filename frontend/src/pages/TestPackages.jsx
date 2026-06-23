import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { 
  ClipboardList, 
  Clock, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  Table, 
  Search, 
  Dna, 
  Stethoscope, 
  FileText, 
  Heart, 
  Upload, 
  MessageSquare, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export default function TestPackages({ onOpenCallbackModal }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Connection error: could not fetch packages database.');
        setLoading(false);
      });
  }, []);

  // Filter packages by Category first
  const categorizedPkgs = categoryFilter === 'All' 
    ? packages 
    : packages.filter(p => p.category === categoryFilter);

  // Filter packages by Search Query second
  const filteredPkgs = categorizedPkgs.filter(pkg => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (pkg.name && pkg.name.toLowerCase().includes(query)) ||
      (pkg.code && pkg.code.toLowerCase().includes(query)) ||
      (pkg.explanation && pkg.explanation.toLowerCase().includes(query)) ||
      (pkg.sampleType && pkg.sampleType.toLowerCase().includes(query))
    );
  });

  // Dynamic check to verify if price displays are enabled by checking if there's any numeric price
  const isPricingEnabled = packages.some(p => 
    typeof p.price === 'number' || 
    (p.price && !isNaN(p.price) && p.price !== 'Available on request')
  );

  return (
    <div className="packages-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Column */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                GenSek Health Diagnostics
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Genetic Test Packages
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '640px', marginBottom: '32px' }}>
                Browse clinical panels, wellness genomics, prenatal screening, sequencing, and advanced diagnostic test options. A pre-test consultation is recommended to confirm the most suitable test.
              </p>
              
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/appointments?type=Genetic%20Test%20Consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                  <ClipboardList size={18} /> Book Pre-Test Consultation
                </Link>
                <button 
                  onClick={() => onOpenCallbackModal('General package inquiry')} 
                  className="btn btn-secondary" 
                  style={{ padding: '14px 28px', color: 'var(--text-main)' }}
                >
                  Request Package Details
                </button>
              </div>
            </div>

            {/* Right Column Visual Card */}
            <div className="card card-glass flex-col" style={{ padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="flex-row-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)', marginBottom: '20px' }}>
                <Dna size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontWeight: 700 }}>Diagnostics Ecosystem</h3>
              <p className="small-text text-muted" style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                Secure, state-of-the-art sequencing and expert clinical interpretation for healthcare providers and patients alike.
              </p>
              
              <ul className="flex-col gap-3" style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 'auto' }}>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  🧬 27+ Available Test Categories
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  ✨ Wellness & Lifestyle Profiles
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  🛡️ Advanced Clinical Genomics
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  ⏱️ Turnaround: 3–6 Weeks
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  💳 Pricing: {isPricingEnabled ? 'Transparent LKR rates' : 'Available on request'}
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Package Summary Strip */}
      <section style={{ padding: '32px 0', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-4" style={{ gap: '20px' }}>
            
            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-accent" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', flexShrink: 0 }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Wellness & Lifestyle</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>Nutrigenomics and lifestyle optimization.</p>
              </div>
            </div>
            
            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-secondary" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', flexShrink: 0 }}>
                <Stethoscope size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Clinical Genomics</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>Rare disease screening & oncology panels.</p>
              </div>
            </div>

            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-accent" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', flexShrink: 0 }}>
                <Dna size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>NIPT & Prenatal</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>Safe screening options from 10 weeks.</p>
              </div>
            </div>

            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-secondary" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', flexShrink: 0 }}>
                <FileText size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Sequencing & Panels</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>Targeted reads and genetic exomes.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filter and View Layout Controls */}
      <section className="section-light" style={{ padding: '32px 0 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="flex-row-between flex-wrap gap-6" style={{ width: '100%' }}>
            
            {/* Search Input & Category Selector */}
            <div className="flex-row align-center gap-4 flex-wrap" style={{ flex: '1', minWidth: '300px' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px', flex: '1' }}>
                <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="text" 
                  placeholder="Search packages..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '50px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* Category Selector (Pills) */}
              <div className="flex-row align-center gap-2 flex-wrap">
                <button 
                  onClick={() => setCategoryFilter('All')} 
                  className="btn"
                  style={{ 
                    padding: '8px 18px', 
                    fontSize: '0.82rem', 
                    borderRadius: '50px',
                    backgroundColor: categoryFilter === 'All' ? 'var(--secondary)' : 'var(--bg-secondary)',
                    color: categoryFilter === 'All' ? 'white' : 'var(--text-muted)',
                    border: categoryFilter === 'All' ? '1px solid transparent' : '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  All Packages
                </button>
                <button 
                  onClick={() => setCategoryFilter('Wellness & Lifestyle')} 
                  className="btn"
                  style={{ 
                    padding: '8px 18px', 
                    fontSize: '0.82rem', 
                    borderRadius: '50px',
                    backgroundColor: categoryFilter === 'Wellness & Lifestyle' ? 'var(--secondary)' : 'var(--bg-secondary)',
                    color: categoryFilter === 'Wellness & Lifestyle' ? 'white' : 'var(--text-muted)',
                    border: categoryFilter === 'Wellness & Lifestyle' ? '1px solid transparent' : '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  Wellness & Lifestyle
                </button>
                <button 
                  onClick={() => setCategoryFilter("Women's and Family Health")} 
                  className="btn"
                  style={{ 
                    padding: '8px 18px', 
                    fontSize: '0.82rem', 
                    borderRadius: '50px',
                    backgroundColor: categoryFilter === "Women's and Family Health" ? 'var(--secondary)' : 'var(--bg-secondary)',
                    color: categoryFilter === "Women's and Family Health" ? 'white' : 'var(--text-muted)',
                    border: categoryFilter === "Women's and Family Health" ? '1px solid transparent' : '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  Women & Family
                </button>
                <button 
                  onClick={() => setCategoryFilter('Clinical and Disease-Focused')} 
                  className="btn"
                  style={{ 
                    padding: '8px 18px', 
                    fontSize: '0.82rem', 
                    borderRadius: '50px',
                    backgroundColor: categoryFilter === 'Clinical and Disease-Focused' ? 'var(--secondary)' : 'var(--bg-secondary)',
                    color: categoryFilter === 'Clinical and Disease-Focused' ? 'white' : 'var(--text-muted)',
                    border: categoryFilter === 'Clinical and Disease-Focused' ? '1px solid transparent' : '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  Clinical & Disease
                </button>
                <button 
                  onClick={() => setCategoryFilter('Advanced Genomic Testing')} 
                  className="btn"
                  style={{ 
                    padding: '8px 18px', 
                    fontSize: '0.82rem', 
                    borderRadius: '50px',
                    backgroundColor: categoryFilter === 'Advanced Genomic Testing' ? 'var(--secondary)' : 'var(--bg-secondary)',
                    color: categoryFilter === 'Advanced Genomic Testing' ? 'white' : 'var(--text-muted)',
                    border: categoryFilter === 'Advanced Genomic Testing' ? '1px solid transparent' : '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  Advanced Genomic
                </button>
              </div>
            </div>

            {/* View Toggle (Segmented control) */}
            <div className="flex-row-center" style={{ background: 'var(--border-color)', padding: '4px', borderRadius: '50px', alignSelf: 'center' }}>
              <button 
                onClick={() => setViewMode('cards')}
                className="btn btn-sm"
                style={{ 
                  backgroundColor: viewMode === 'cards' ? 'var(--bg-secondary)' : 'transparent', 
                  color: 'var(--text-main)', 
                  padding: '6px 16px', 
                  fontSize: '0.8rem', 
                  borderRadius: '50px',
                  boxShadow: viewMode === 'cards' ? 'var(--shadow-sm)' : 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Layers size={14} /> Cards
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className="btn btn-sm"
                style={{ 
                  backgroundColor: viewMode === 'table' ? 'var(--bg-secondary)' : 'transparent', 
                  color: 'var(--text-main)', 
                  padding: '6px 16px', 
                  fontSize: '0.8rem', 
                  borderRadius: '50px',
                  boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Table size={14} /> Table
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Packages listing */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {error && (
            <div className="form-alert error-alert mb-8" style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Patient Guidance Info Card */}
          <div className="card flex-row align-center gap-4 mb-8" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.15)', borderRadius: '20px' }}>
            <div className="flex-row-center text-secondary" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', flexShrink: 0 }}>
              <HelpCircle size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Not sure which package is suitable?</h4>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.6' }}>
                Genetic test selection should be guided by clinical history, family history, current reports, and consultation goals. Book a pre-test consultation to choose the most appropriate test.
              </p>
            </div>
            <Link to="/appointments?type=Genetic%20Test%20Consultation" className="btn btn-secondary btn-sm" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>
              Book Consultation
            </Link>
          </div>

          {loading ? (
            <p className="text-center py-12 text-muted">Loading packages database...</p>
          ) : filteredPkgs.length === 0 ? (
            /* Empty State */
            <div className="card text-center flex-col align-center justify-center" style={{ padding: '48px 24px', borderRadius: '20px', background: 'var(--bg-secondary)' }}>
              <div className="flex-row-center text-gold" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(180, 83, 9, 0.08)', marginBottom: '16px' }}>
                <AlertCircle size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No packages found</h3>
              <p className="small-text text-muted" style={{ maxWidth: '440px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                No packages match your search query or filter. Try another search or contact us for guidance.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                Contact The Gene Clinic
              </Link>
            </div>
          ) : viewMode === 'cards' ? (
            /* Card Layout */
            <div className="grid grid-3" style={{ gap: '24px' }}>
              {filteredPkgs.map((pkg) => {
                const isNumericPrice = typeof pkg.price === 'number';
                return (
                  <div 
                    key={pkg.id} 
                    className="card flex-col-card package-card" 
                    style={{ 
                      padding: '28px', 
                      background: 'var(--bg-secondary)', 
                      borderRadius: '24px',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all var(--transition-normal)'
                    }}
                  >
                    {/* Accent top line and badges */}
                    <div style={{ width: '40px', height: '4px', background: 'var(--secondary)', borderRadius: '4px', marginBottom: '16px' }}></div>
                    <div className="flex-row-between gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
                      <span className="badge font-mono" style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                        {pkg.code || 'GC/--'}
                      </span>
                      <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '4px 10px' }}>
                        {pkg.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                      {pkg.name}
                    </h3>
                    
                    <p className="xsmall-text text-muted mb-4" style={{ lineHeight: '1.6', minHeight: '64px' }}>
                      {pkg.explanation}
                    </p>

                    <div className="pkg-specs mt-auto border-top pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                      <div className="flex-row-between mb-2">
                        <span className="xsmall-text text-light font-bold">Sample:</span>
                        <span className="xsmall-text text-muted" style={{ fontWeight: 600 }}>{pkg.sampleType}</span>
                      </div>
                      <div className="flex-row-between mb-4">
                        <span className="xsmall-text text-light font-bold">TAT:</span>
                        <span className="xsmall-text text-muted" style={{ fontWeight: 600 }}>{pkg.tat}</span>
                      </div>
                      
                      <div className="flex-row-between align-center p-3 rounded-lg bg-secondary" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                        <span className="xsmall-text text-muted" style={{ fontWeight: 700 }}>Rate</span>
                        <span className="small-text font-bold text-accent" style={{ fontSize: '0.95rem' }}>
                          {isNumericPrice ? `Rs. ${pkg.price.toLocaleString()}` : pkg.price}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-2 gap-2">
                      <button 
                        onClick={() => onOpenCallbackModal(pkg.name)} 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700 }}
                      >
                        Request Details
                      </button>
                      <Link 
                        to={`/appointments?type=${encodeURIComponent(pkg.name)}`} 
                        className="btn btn-primary btn-sm text-center"
                        style={{ padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700 }}
                      >
                        Book Test
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table Layout */
            <div className="card" style={{ padding: '0px', overflow: 'hidden', border: '1px solid var(--border-color)', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', background: 'var(--bg-secondary)' }}>
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '16px 20px', width: '90px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Code</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Test Package</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Category</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Sample Type</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>TAT</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Price</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPkgs.map((pkg, index) => {
                      const isNumericPrice = typeof pkg.price === 'number';
                      return (
                        <tr 
                          key={pkg.id} 
                          style={{ 
                            borderBottom: index === filteredPkgs.length - 1 ? 'none' : '1px solid var(--border-color)',
                            background: index % 2 === 1 ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'
                          }}
                        >
                          <td style={{ padding: '18px 20px' }}>
                            <span className="font-mono xsmall-text font-bold" style={{ color: 'var(--secondary)', background: 'rgba(2, 132, 199, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>
                              {pkg.code || 'GC/--'}
                            </span>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{pkg.name}</strong>
                            <p className="xsmall-text text-muted" style={{ margin: '4px 0 0', maxWidth: '400px', lineHeight: '1.5' }}>{pkg.explanation}</p>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <span className="badge badge-accent" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                              {pkg.category}
                            </span>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <span className="badge" style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                              {pkg.sampleType}
                            </span>
                          </td>
                          <td style={{ padding: '18px 20px', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                            {pkg.tat}
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <span className="small-text font-bold" style={{ color: 'var(--text-main)' }}>
                              {isNumericPrice ? `Rs. ${pkg.price.toLocaleString()}` : pkg.price}
                            </span>
                          </td>
                          <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                            <div className="flex-row-center gap-2">
                              <button 
                                onClick={() => onOpenCallbackModal(pkg.name)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700 }}
                              >
                                Details
                              </button>
                              <Link 
                                to={`/appointments?type=${encodeURIComponent(pkg.name)}`}
                                className="btn btn-primary btn-sm"
                                style={{ padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700 }}
                              >
                                Book
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footnote */}
          <div className="card card-glass mt-12 bg-secondary" style={{ padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
            <div className="flex-row align-center gap-3">
              <div className="flex-row-center text-gold" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(180, 83, 9, 0.08)', flexShrink: 0 }}>
                <Clock size={16} />
              </div>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.6' }}>
                <strong>Turnaround Time (TAT) Footnote:</strong> Turnaround time may vary depending on the selected test. Most reports may take approximately 3–6 weeks, depending on test type and laboratory process. Suitability should be discussed during pre-test counselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info on Sample Types Glossary */}
      <section className="section bg-secondary" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Clinical Protocols</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)' }}>Supported Sample Types Glossary</h2>
            <p className="small-text text-muted" style={{ maxWidth: '600px', margin: '12px auto 0', lineHeight: '1.6' }}>
              We coordinate testing from various medical sample structures to ensure maximum screening accuracy.
            </p>
          </div>
          <div className="grid grid-4">
            <div className="card" style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700 }}>Whole Blood</h4>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>Standard venous draw in EDTA or Streck cell-free DNA tubes.</p>
            </div>
            <div className="card" style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700 }}>Saliva</h4>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>Swab or tube collections, optimal for wellness blueprint panels.</p>
            </div>
            <div className="card" style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700 }}>Stool</h4>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>Required for metagenomic gut microbiome profiling.</p>
            </div>
            <div className="card" style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700 }}>Tissue & Biopsies</h4>
              <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>FFPE blocks/slides, embryo biopsies, or liquid biopsies on request.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-secondary" style={{ padding: '96px 0' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Genetic Guidance</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Need help choosing the right genetic test?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Our team can guide you based on your health concern, family history, pregnancy status, or previous genetic reports.
          </p>
          <div className="flex-row-center gap-4 flex-wrap">
            <Link to="/appointments?type=General%20genetic%20consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              <ClipboardList size={18} /> Book Consultation
            </Link>
            <button 
              onClick={() => onOpenCallbackModal('Report review and upload inquiry')} 
              className="btn btn-secondary" 
              style={{ padding: '14px 28px', color: 'var(--text-main)' }}
            >
              <Upload size={18} /> Upload Report
            </button>
            <a 
              href="https://wa.me/94701917000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary" 
              style={{ padding: '14px 28px', backgroundColor: '#25D366', color: 'white', borderColor: 'transparent' }}
            >
              <MessageSquare size={18} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}
