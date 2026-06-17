import React, { useState } from 'react';
import { Microscope, FileDown, Presentation, Award, BookOpen, Send, CheckCircle2 } from 'lucide-react';

export default function Research() {
  const [collabSent, setCollabSent] = useState(false);
  const [collabName, setCollabName] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabMessage, setCollabMessage] = useState('');

  const handleCollabSubmit = (e) => {
    e.preventDefault();
    setCollabSent(true);
  };

  return (
    <div className="research-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container profile-grid">
          <div className="profile-info">
            <span className="badge badge-accent mb-4">Academic & Laboratory Office</span>
            <h1 className="text-gradient">Research & Publications</h1>
            <p className="lead-text mt-4">
              Dr. Lahiru Prabodha combines patient consultations with human genetics lecturing at the University of Ruhuna and laboratory coordination at the Faculty's Molecular Genetic Laboratory.
            </p>
            <div className="mt-8 flex-row-center gap-4 flex-wrap">
              <button 
                onClick={() => alert("CV download started! (Mock download of Dr_Lahiru_Prabodha_Ruhuna_CV.pdf)")}
                className="btn btn-primary"
              >
                <FileDown size={18} /> Download Academic CV
              </button>
              <a href="#collab-form" className="btn btn-secondary">
                Request Collaboration
              </a>
            </div>
          </div>
          <div className="profile-image-container flex-row-center">
            <Microscope size={120} className="text-accent-light animate-pulse" />
          </div>
        </div>
      </section>

      {/* Laboratory Leadership & University */}
      <section className="section section-light">
        <div className="container grid grid-2">
          <div>
            <span className="badge badge-accent mb-4">University of Ruhuna</span>
            <h2>Teaching & Molecular Genetics Lab</h2>
            <p className="mt-4">
              As the Head of the Molecular Genetic Laboratory, Department of Anatomy & Genetics, Faculty of Medicine, University of Ruhuna, Dr. Lahiru leads translational research focusing on Southern Province variant registers.
            </p>
            <p className="mt-4">
              The laboratory coordinates research in chromosomal anomalies, molecular diagnostics development, and bioinformatic pipelines to compile variant spectrums in Sri Lanka.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="card card-glass flex-row-center gap-3">
              <Award size={20} className="text-gold" />
              <div>
                <h4>Senior Lecturer</h4>
                <p className="xsmall-text">Lecturing medical undergraduates in clinical genetics & bioethics.</p>
              </div>
            </div>
            <div className="card card-glass flex-row-center gap-3">
              <Microscope size={20} className="text-accent" />
              <div>
                <h4>Southern Province Variant Curation</h4>
                <p className="xsmall-text">Compiling genomic variants registries for clinical studies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications ledger */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Academic Ledger</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Publications and international presentations co-authored by Dr. Lahiru.
            </p>
          </div>
          <div className="grid grid-2">
            <div className="card card-accent">
              <div className="flex-row-center gap-2 mb-4">
                <BookOpen size={18} className="text-accent" />
                <h4>Selected Publications</h4>
              </div>
              <ul className="styled-list">
                <li className="xsmall-text mb-4">
                  <strong>"Hypertrophic Cardiomyopathy Genomic Variant Spectrum in Sri Lanka"</strong> &bull; Southern Medical Journal (2025).
                </li>
                <li className="xsmall-text mb-4">
                  <strong>"Chromosomal Microarray Diagnostic Yield in Children with Developmental Delays"</strong> &bull; Pediatric Genetics Bulletin (2024).
                </li>
                <li className="xsmall-text">
                  <strong>"Carrier Screening Logistics for Hemoglobinopathies in Low-Resource Systems"</strong> &bull; Regional Bioethics Review (2023).
                </li>
              </ul>
            </div>

            <div className="card card-gold">
              <div className="flex-row-center gap-2 mb-4">
                <Presentation size={18} className="text-gold" />
                <h4>Recent Conferences</h4>
              </div>
              <ul className="styled-list">
                <li className="xsmall-text mb-4">
                  <strong>Asia Pacific Conference on Human Genetics (APCHG 2024)</strong> &bull; Presenting "South Asian variant representation in clinical databases."
                </li>
                <li className="xsmall-text">
                  <strong>Sri Lanka Medical Association Academic Sessions (2023)</strong> &bull; Speaking on "Integrating clinical genomics into regional diagnostic referral paths."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration request */}
      <section className="section section-light" id="collab-form">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card card-gold">
            <div className="text-center mb-6">
              <span className="badge badge-gold mb-2">Institutional Partnerships</span>
              <h2>Request Academic Collaboration</h2>
            </div>

            {collabSent ? (
              <div className="text-center py-6">
                <CheckCircle2 size={48} className="text-accent text-center-icon animate-bounce" />
                <h3 className="mt-4">Inquiry Received</h3>
                <p className="xsmall-text mt-2 text-muted">
                  Thank you. Dr. Lahiru Prabodha or his academic assistant will contact you.
                </p>
                <button onClick={() => setCollabSent(false)} className="btn btn-secondary mt-6">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleCollabSubmit}>
                <div className="form-group">
                  <label>Your Name / Faculty *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={collabName} 
                    onChange={e => setCollabName(e.target.value)}
                    placeholder="e.g. Department of Paediatrics, Ruhuna Faculty" 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    value={collabEmail} 
                    onChange={e => setCollabEmail(e.target.value)}
                    placeholder="e.g. scholar@ruh.ac.lk" 
                  />
                </div>
                <div className="form-group">
                  <label>Project Details *</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    required 
                    value={collabMessage} 
                    onChange={e => setCollabMessage(e.target.value)}
                    placeholder="Describe potential study parameters, sample sizes, and required laboratory inputs..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Collaboration Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
