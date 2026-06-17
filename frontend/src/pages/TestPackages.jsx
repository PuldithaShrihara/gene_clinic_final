import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Clock, Layers, Sparkles, AlertCircle, Eye, Table } from 'lucide-react';

export default function TestPackages({ onOpenCallbackModal }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'cards' or 'table'
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
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

  const filteredPkgs = categoryFilter === 'All' 
    ? packages 
    : packages.filter(p => p.category === categoryFilter);

  return (
    <div className="packages-page animate-fade-in">
      {/* Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">GenSek Health Diagnostics</span>
          <h1 className="text-gradient">Genetic Test Packages</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            Browse our clinical panels and wellness profiling options. Pre-test consultations are recommended to confirm test appropriateness.
          </p>
        </div>
      </section>

      {/* Filter and View Layout Controls */}
      <section className="section section-light pt-6 pb-6 border-bottom">
        <div className="container flex-row-between flex-wrap gap-4">
          {/* Category Selector */}
          <div className="flex-row-center gap-2 flex-wrap">
            <button 
              onClick={() => setCategoryFilter('All')} 
              className={`btn ${categoryFilter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              All Packages
            </button>
            <button 
              onClick={() => setCategoryFilter('Wellness & Lifestyle Packages')} 
              className={`btn ${categoryFilter === 'Wellness & Lifestyle Packages' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Wellness & Lifestyle
            </button>
            <button 
              onClick={() => setCategoryFilter('Advanced Genomics & Clinical Packages')} 
              className={`btn ${categoryFilter === 'Advanced Genomics & Clinical Packages' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Advanced Clinical
            </button>
          </div>

          {/* View Toggles */}
          <div className="flex-row-center gap-2 border p-1 rounded-md bg-secondary">
            <button 
              onClick={() => setViewMode('cards')}
              className="action-btn"
              style={{ backgroundColor: viewMode === 'cards' ? 'var(--secondary)' : 'transparent', color: viewMode === 'cards' ? 'white' : 'var(--text-muted)', width: 'auto', padding: '4px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Card Layout"
            >
              <Layers size={14} /> Cards
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className="action-btn"
              style={{ backgroundColor: viewMode === 'table' ? 'var(--secondary)' : 'transparent', color: viewMode === 'table' ? 'white' : 'var(--text-muted)', width: 'auto', padding: '4px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Table Layout"
            >
              <Table size={14} /> Table
            </button>
          </div>
        </div>
      </section>

      {/* Main Packages listing */}
      <section className="section section-light pt-8">
        <div className="container">
          {error && (
            <div className="form-alert error-alert mb-8" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <p className="text-center py-12 text-muted">Loading packages database...</p>
          ) : viewMode === 'cards' ? (
            /* Card Layout */
            <div className="grid grid-2">
              {filteredPkgs.map((pkg) => (
                <div key={pkg.id} className="card card-accent flex-col-card hover-scale package-card">
                  <div className="flex-row-between gap-4 mb-4">
                    <span className="badge badge-accent">{pkg.category}</span>
                    <span className="badge badge-gold font-bold">
                      {typeof pkg.price === 'number' ? `Rs. ${pkg.price.toLocaleString()}` : pkg.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{pkg.name}</h3>
                  <p className="mb-4 small-text">{pkg.explanation}</p>

                  <div className="pkg-specs mt-auto border-top pt-4">
                    <div className="spec-row mb-2">
                      <strong>Sample Type:</strong>
                      <span className="badge ml-2">{pkg.sampleType}</span>
                    </div>
                    <div className="spec-row mb-2">
                      <strong>Turnaround Time:</strong>
                      <span className="small-text text-muted ml-2">{pkg.tat}</span>
                    </div>
                    <div className="spec-row mb-2">
                      <strong>Suitable For:</strong>
                      <p className="xsmall-text text-muted mt-1">{pkg.whoFor}</p>
                    </div>
                    <div className="spec-row mb-6">
                      <strong>Deliverables:</strong>
                      <p className="xsmall-text text-muted mt-1">{pkg.deliverables}</p>
                    </div>
                  </div>

                  <div className="grid grid-2 gap-3 mt-4">
                    <button 
                      onClick={() => onOpenCallbackModal(pkg.name)} 
                      className="btn btn-secondary w-full"
                    >
                      Request Details
                    </button>
                    <Link 
                      to={`/appointments?type=${encodeURIComponent(pkg.name)}`} 
                      className="btn btn-primary w-full text-center"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table Layout */
            <div className="card" style={{ padding: '16px', overflow: 'hidden' }}>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>S.No</th>
                      <th>Test Package</th>
                      <th>Sample Type</th>
                      <th>Rate (LKR)</th>
                      <th>Center/Doctor (10%)</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPkgs.map((pkg) => {
                      const isNumericPrice = typeof pkg.price === 'number' || (!isNaN(parseFloat(pkg.price)) && isFinite(pkg.price));
                      const numericPrice = isNumericPrice ? parseFloat(pkg.price) : 0;
                      
                      return (
                        <tr key={pkg.id}>
                          <td>
                            <span className="font-mono xsmall-text font-bold text-secondary bg-secondary-light/10 px-2 py-0.5 rounded">
                              {pkg.code || 'GC/--'}
                            </span>
                          </td>
                          <td>
                            <strong>{pkg.name}</strong>
                            <p className="xsmall-text text-muted mt-1">{pkg.explanation}</p>
                          </td>
                          <td>
                            <span className="badge">{pkg.sampleType}</span>
                          </td>
                          <td>
                            <span className="small-text font-bold" style={{ color: 'var(--text-main)' }}>
                              {isNumericPrice ? `Rs. ${numericPrice.toLocaleString()}` : pkg.price}
                            </span>
                          </td>
                          <td>
                            <span className="small-text font-bold text-gold">
                              {isNumericPrice ? `Rs. ${(numericPrice * 0.1).toLocaleString()}` : '10%'}
                            </span>
                          </td>
                          <td>
                            <div className="flex-row-center gap-2">
                              <button 
                                onClick={() => onOpenCallbackModal(pkg.name)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                              >
                                Details
                              </button>
                              <Link 
                                to={`/appointments?type=${encodeURIComponent(pkg.name)}`}
                                className="btn btn-primary btn-sm"
                                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
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
          <div className="card card-glass mt-12 bg-secondary" style={{ padding: '24px' }}>
            <div className="flex-row-center gap-2 text-muted">
              <Clock size={16} className="text-gold" />
              <p className="xsmall-text">
                <strong>Turnaround Time (TAT) Footnote:</strong> Turnaround time may vary depending on the selected test. Most reports may take approximately 3–6 weeks, depending on test type and laboratory process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info on Sample Types */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Supported Sample Types Glossary</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              We coordinates testing from various medical sample structures.
            </p>
          </div>
          <div className="grid grid-4 text-center">
            <div className="card" style={{ padding: '20px' }}>
              <h4>Whole Blood</h4>
              <p className="xsmall-text mt-2">Standard venous draw in EDTA or Streck cell-free DNA tubes.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4>Saliva</h4>
              <p className="xsmall-text mt-2">Swab or tube collections, optimal for wellness blueprint panels.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4>Stool</h4>
              <p className="xsmall-text mt-2">Required for metagenomic gut microbiome profiling.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4>Tissue & Biopsies</h4>
              <p className="xsmall-text mt-2">FFPE blocks/slides, embryo biopsies, or liquid biopsies on request.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
