import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Microscope, 
  FileDown, 
  Presentation, 
  Award, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  ClipboardList, 
  Globe, 
  Users,
  Compass,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function Research() {
  const [collabSent, setCollabSent] = useState(false);
  const [collabName, setCollabName] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabMessage, setCollabMessage] = useState('');

  const handleCollabSubmit = (e) => {
    e.preventDefault();
    setCollabSent(true);
    setCollabName('');
    setCollabEmail('');
    setCollabMessage('');
  };

  const researchInterests = [
    { title: 'Clinical Genetics', desc: 'Evaluating clinical syndromes and familial patterns.' },
    { title: 'Molecular Genetics', desc: 'DNA sequencing technologies and variant identification.' },
    { title: 'Cytogenetics', desc: 'Chromosomal structures and karyotyping evaluations.' },
    { title: 'Prenatal Genetics', desc: 'Cell-free DNA screening and prenatal diagnosis options.' },
    { title: 'Wellness Genomics', desc: 'Nutrigenomics and metabolic lifestyle blueprints.' },
    { title: 'Genetic Counselling', desc: 'Clinical patient communications and ethical guidance.' },
    { title: 'Inherited Conditions', desc: 'Mapping cardiomyopathies, thalassemias, and rare diseases.' },
    { title: 'Genomic Report Interpretation', desc: 'ACMG variant classifications and clinical action guidelines.' }
  ];

  const publications = [
    {
      title: 'Hypertrophic Cardiomyopathy Genomic Variant Spectrum in Sri Lanka',
      journal: 'Southern Medical Journal',
      year: '2025',
      category: 'Research Paper',
      desc: 'Translational study mapping mutations within the Southern Province cardiomyopathy registry.'
    },
    {
      title: 'Chromosomal Microarray Diagnostic Yield in Children with Developmental Delays',
      journal: 'Pediatric Genetics Bulletin',
      year: '2024',
      category: 'Clinical Study',
      desc: 'Evaluating genomic CNVs and diagnostic utility compared to standard karyotyping.'
    },
    {
      title: 'Carrier Screening Logistics for Hemoglobinopathies in Low-Resource Systems',
      journal: 'Regional Bioethics Review',
      year: '2023',
      category: 'Review Paper',
      desc: 'Ethical and logistical frameworks for setting up pre-conception screen pipelines.'
    }
  ];

  const conferences = [
    {
      title: 'South Asian variant representation in clinical databases',
      event: 'Asia Pacific Conference on Human Genetics (APCHG 2024)',
      role: 'Presenter',
      desc: 'Highlighting gaps in global genomic reference registries and representation solutions.'
    },
    {
      title: 'Integrating clinical genomics into regional diagnostic referral paths',
      event: 'Sri Lanka Medical Association Academic Sessions (2023)',
      role: 'Guest Speaker',
      desc: 'Reviewing clinical guidelines for physician referral networks and laboratory transit.'
    }
  ];

  return (
    <div className="research-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Column */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                Academic & Laboratory Office
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Research & Publications
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '640px', marginBottom: '32px' }}>
                Academic work, molecular genetics laboratory leadership, teaching contributions, research interests, and professional collaborations connected to clinical genetics and genomics.
              </p>
              
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => alert("CV download started! (Mock download of Dr_Lahiru_Prabodha_Ruhuna_CV.pdf)")}
                  className="btn btn-primary"
                  style={{ padding: '14px 28px' }}
                >
                  <FileDown size={18} /> Download Academic CV
                </button>
                <a href="#collab-form" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
                  Request Collaboration
                </a>
              </div>
            </div>

            {/* Right Column Summary Card */}
            <div className="card card-glass flex-col" style={{ padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.7rem' }}>
                Academic & Laboratory Expertise
              </span>
              <div className="flex-row align-center gap-3 mb-4">
                <div className="flex-row-center text-secondary" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', flexShrink: 0 }}>
                  <Microscope size={28} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Molecular Genetics Laboratory</h4>
                  <p className="xsmall-text text-muted" style={{ margin: '2px 0 0' }}>Faculty of Medicine, University of Ruhuna</p>
                </div>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '16px' }}>
                Coordinating translational genetics, undergraduates teaching, DNA panel design, and Southern Province variant register projects.
              </p>
              <div className="border-top pt-4 mt-auto">
                <span className="xsmall-text font-bold text-accent">
                  Clinical Genetics | Teaching | Research
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Academic Highlights */}
      <section style={{ padding: '32px 0', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-4" style={{ gap: '20px' }}>
            
            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-accent" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', flexShrink: 0 }}>
                <Microscope size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>Molecular Lab</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.3' }}>Advanced diagnostics research.</p>
              </div>
            </div>

            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-secondary" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', flexShrink: 0 }}>
                <GraduationCap size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>Genetics Teaching</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.3' }}>Medical faculty lecturing.</p>
              </div>
            </div>

            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-accent" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', flexShrink: 0 }}>
                <Presentation size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>Presentations</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.3' }}>South Asian variants registers.</p>
              </div>
            </div>

            <div className="card flex-row align-center gap-3" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row-center text-secondary" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', flexShrink: 0 }}>
                <Users size={18} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>Collaboration</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.3' }}>National & global panels.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Research Interests Section */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Academic Fields</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)' }}>Research Interests</h2>
            <p className="small-text text-muted" style={{ maxWidth: '600px', margin: '12px auto 0', lineHeight: '1.6' }}>
              Specialized research domains focused on translating genomics insights into regional diagnostic improvements.
            </p>
          </div>

          <div className="grid grid-4" style={{ gap: '20px' }}>
            {researchInterests.map((interest, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  padding: '24px', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '20px', 
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700, color: 'var(--text-main)' }}>{interest.title}</h4>
                <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>{interest.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Publications & Academic Contributions */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Academic Ledger</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)' }}>Publications & Contributions</h2>
            <p className="small-text text-muted" style={{ maxWidth: '600px', margin: '12px auto 0', lineHeight: '1.6' }}>
              Academic papers, journal studies, and conference presentations co-authored by Dr. Lahiru Prabodha.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: '32px' }}>
            
            {/* Publications */}
            <div className="flex-col gap-4">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} className="text-secondary" /> Selected Publications
              </h3>
              
              {publications.map((pub, idx) => (
                <div key={idx} className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '18px' }}>
                  <div className="flex-row-between gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
                    <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>{pub.category}</span>
                    <span className="xsmall-text text-light font-bold">{pub.journal} ({pub.year})</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.4' }}>
                    "{pub.title}"
                  </h4>
                  <p className="xsmall-text text-muted mb-3" style={{ lineHeight: '1.5' }}>{pub.desc}</p>
                  <button 
                    onClick={() => alert(`Details for "${pub.title}" can be requested via collaboration form.`)} 
                    className="xsmall-text font-bold flex-row align-center gap-1"
                    style={{ color: 'var(--secondary)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                  >
                    View Details <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Conferences */}
            <div className="flex-col gap-4">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Presentation size={20} className="text-accent" /> Recent Conferences
              </h3>
              
              {conferences.map((conf, idx) => (
                <div key={idx} className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '18px' }}>
                  <div className="flex-row-between gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>{conf.role}</span>
                    <span className="xsmall-text text-light font-bold">{conf.event}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.4' }}>
                    "{conf.title}"
                  </h4>
                  <p className="xsmall-text text-muted mb-3" style={{ lineHeight: '1.5' }}>{pubDesc(conf.desc)}</p>
                  <button 
                    onClick={() => alert(`Details for "${conf.title}" are available in event proceedings.`)} 
                    className="xsmall-text font-bold flex-row align-center gap-1"
                    style={{ color: 'var(--accent)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                  >
                    View Proceedings <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Collaboration Request Form */}
      <section className="section section-light" id="collab-form" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card" style={{ padding: '40px 32px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', background: 'var(--bg-secondary)' }}>
            
            <div className="text-center mb-8">
              <span className="badge badge-gold mb-3">Institutional Partnerships</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Request Academic Collaboration</h2>
              <p className="xsmall-text text-muted mt-2" style={{ lineHeight: '1.5' }}>
                Join study protocols, genomics data sharing registries, or lecture coordination boards with our Ruhuna anatomy lab team.
              </p>
            </div>

            {collabSent ? (
              <div className="text-center py-6">
                <div className="flex-row-center text-accent text-center-icon mb-4" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Inquiry Received</h3>
                <p className="xsmall-text mt-2 text-muted" style={{ lineHeight: '1.6' }}>
                  Thank you. Dr. Lahiru Prabodha or his academic assistant will contact you.
                </p>
                <button onClick={() => setCollabSent(false)} className="btn btn-secondary mt-6" style={{ padding: '8px 24px', fontSize: '0.85rem' }}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleCollabSubmit} className="flex-col gap-4">
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Your Name / Faculty *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={collabName} 
                    onChange={e => setCollabName(e.target.value)}
                    placeholder="e.g. Department of Paediatrics, Ruhuna Faculty" 
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    value={collabEmail} 
                    onChange={e => setCollabEmail(e.target.value)}
                    placeholder="e.g. scholar@ruh.ac.lk" 
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Project Details *</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    required 
                    value={collabMessage} 
                    onChange={e => setCollabMessage(e.target.value)}
                    placeholder="Describe potential study parameters, sample sizes, and required laboratory inputs..."
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ padding: '12px', marginTop: '8px' }}>
                  Submit Collaboration Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Collaboration Final CTA */}
      <section className="section bg-secondary" style={{ padding: '96px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Academic Outreach</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Interested in academic or clinical collaboration?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Send a collaboration request for genetics education, research, laboratory coordination, or clinical genomics projects.
          </p>
          <div className="flex-row-center gap-4 flex-wrap">
            <a href="#collab-form" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              <Send size={18} /> Request Collaboration
            </a>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
              <MessageSquare size={18} /> Contact The Gene Clinic
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Small helper to safely output paragraph summaries
function pubDesc(text) {
  return text;
}
