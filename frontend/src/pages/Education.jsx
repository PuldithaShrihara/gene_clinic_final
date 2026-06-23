import React from 'react';
import { BookOpen, GraduationCap, Video, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Education() {
  return (
    <div className="education-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Educational Hub</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Genomics & Health Education
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Empowering patients, families, and healthcare professionals with evidence-based insights into genetic testing, personalized management, and preventive wellness.
              </p>
              <a href="/articles" className="btn btn-primary flex-row-center gap-2" style={{ display: 'inline-flex', padding: '12px 28px', textDecoration: 'none' }}>
                Read Educational Articles <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex' }}>
                <ShieldCheck size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Evidence-Based Guidance</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                All educational materials are curated by genetics specialists and medical advisors to ensure accuracy, safety, and alignment with modern clinical guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Sections */}
      <section className="section section-light" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div className="grid grid-2 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* General Community Education */}
            <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'var(--accent)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              <div className="flex-row-center text-accent mb-6" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(15, 118, 110, 0.08)', display: 'flex' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>General Community Education</h3>
              <p className="small-text text-muted" style={{ lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                Simplifying complex genomic concepts to help patients and families understand genetic screening, hereditary risk assessments, and the role of precision lifestyle guidance. Learn how proactive screening can guide lifestyle adjustments and health awareness.
              </p>
              <div className="flex-col gap-3" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '14px' }}>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Key Topics Covered:</h5>
                <ul className="xsmall-text text-muted flex-col gap-2" style={{ listStyleType: 'disc', paddingLeft: '18px', margin: 0 }}>
                  <li>Understanding NIPT and prenatal screening pathways.</li>
                  <li>How wellness blueprinting guides diet, fitness, and lifestyle.</li>
                  <li>Demystifying genes, variants, and disease susceptibility.</li>
                  <li>Recognizing the importance of pre-test and post-test counselling.</li>
                </ul>
              </div>
            </div>

            {/* Medical Community Education */}
            <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'var(--secondary)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              <div className="flex-row-center text-secondary mb-6" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.08)', display: 'flex' }}>
                <GraduationCap size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Medical Community Education</h3>
              <p className="small-text text-muted" style={{ lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                Providing clinical resources, test guides, and evidence-based publications for physicians, pediatricians, obstetricians, and partner laboratories. Facilitating the integration of precision medicine and molecular diagnostics into daily clinical workflows.
              </p>
              <div className="flex-col gap-3" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '14px' }}>
                <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Clinical Support Resources:</h5>
                <ul className="xsmall-text text-muted flex-col gap-2" style={{ listStyleType: 'disc', paddingLeft: '18px', margin: 0 }}>
                  <li>Interpretation guides for multi-gene panel reports.</li>
                  <li>Clinical indications and timing criteria for NIPT screening.</li>
                  <li>CME webinars and precision medicine symposia.</li>
                  <li>Partnering with molecular facilities for genomic testing.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Webinars & Video Content Placeholder */}
          <div className="card card-glass" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div className="grid grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge badge-secondary mb-3">Webinars & Media</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Educational Webinars & Interactive Sessions</h3>
                <p className="small-text text-muted" style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                  We are launching a series of interactive webinars hosted by Dr. Lahiru Prabodha and guest specialists in clinical genetics. Topics will cover prenatal screening advances, cardiovascular risk predisposition, and modern lifestyle medicine.
                </p>
                <div className="flex-row align-center gap-3 text-muted" style={{ display: 'flex' }}>
                  <Video size={18} className="text-secondary" />
                  <span className="xsmall-text font-semibold">Live Webinars and Interactive Q&As Coming Soon</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '18px', border: '1px dashed var(--border-color)' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Get Notified of Upcoming Sessions</h4>
                <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                  Interested in attending our clinical or public genomics seminars? Send us a message via our contact channel to be included in our webinar notification list.
                </p>
                <a href="/contact" className="btn btn-secondary text-center" style={{ width: '100%', padding: '12px' }}>
                  Contact Clinic Coordinator
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
