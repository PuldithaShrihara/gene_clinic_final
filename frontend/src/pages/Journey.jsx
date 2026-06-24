import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  PhoneCall, 
  HelpCircle, 
  Stethoscope, 
  CheckSquare, 
  HeartHandshake, 
  Upload, 
  MessageSquare,
  ArrowRight,
  Info,
  ChevronRight
} from 'lucide-react';

export default function Journey() {
  const steps = [
    {
      step: '1',
      title: 'Initial Inquiry',
      subtitle: 'Connecting with the Clinic',
      icon: PhoneCall,
      desc: 'Contact the clinic through phone, WhatsApp, email, or the appointment form. Our team will clarify your concern, preferred consultation type, and available appointment options.',
      ctaText: 'Contact The Gene Clinic',
      ctaLink: '/contact'
    },
    {
      step: '2',
      title: 'Consultation',
      subtitle: 'In-Depth Evaluation',
      icon: HelpCircle,
      desc: 'Dr. Lahiru Prabodha reviews your medical history, family history, pregnancy details if relevant, previous reports, and main consultation goals.',
      ctaText: 'Book Consultation',
      ctaLink: '/appointments?type=General%20genetic%20consultation'
    },
    {
      step: '3',
      title: 'Test Guidance',
      subtitle: 'Personalized Planning',
      icon: Stethoscope,
      desc: 'Based on your background, the doctor explains whether genetic testing, NIPT, wellness genomics, sequencing, clinical panels, or report review is suitable.',
      ctaText: 'Explore Test Packages',
      ctaLink: '/packages'
    },
    {
      step: '4',
      title: 'Sample Collection & Testing',
      subtitle: 'Molecular Logistics',
      icon: CheckSquare,
      desc: 'Samples are collected according to the selected test type, such as blood, saliva, stool, tissue, FFPE block, embryo biopsy, or other approved sample requirements.',
      ctaText: 'Review Collection Guide',
      ctaLink: '/nipt#sample-collection'
    },
    {
      step: '5',
      title: 'Result Interpretation & Follow-up',
      subtitle: 'Collaborative Care Path',
      icon: HeartHandshake,
      desc: 'Results are explained in a clear and responsible way, including possible implications, family risk, lifestyle guidance, referral needs, or follow-up care.',
      ctaText: 'Upload Reports',
      ctaLink: '/appointments?action=upload'
    }
  ];

  return (
    <div className="journey-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Stylesheet Injection for alternating vertical timeline layout */}
      <style>{`
        .journey-timeline {
          position: relative;
          max-width: 1100px;
          margin: 40px auto 0;
          padding: 20px 0;
        }

        /* Centered vertical line on desktop */
        .journey-timeline::after {
          content: '';
          position: absolute;
          width: 4px;
          background-color: var(--border-color);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
          border-radius: 4px;
        }

        /* Individual container */
        .timeline-card-container {
          padding: 15px 50px;
          position: relative;
          background-color: transparent;
          width: 50%;
          box-sizing: border-box;
        }

        /* Left side container properties */
        .timeline-card-container.left {
          left: 0;
        }

        /* Right side container properties */
        .timeline-card-container.right {
          left: 50%;
        }

        /* Circles on the timeline */
        .timeline-card-container::after {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          right: -11px;
          background-color: var(--bg-primary);
          border: 4px solid var(--secondary);
          top: 36px;
          border-radius: 50%;
          z-index: 2;
          transition: all var(--transition-fast);
        }

        /* Right circle offset adjustment */
        .timeline-card-container.right::after {
          left: -11px;
          right: auto;
        }

        /* Node dot hover scaling */
        .timeline-card-container:hover::after {
          background-color: var(--secondary);
          transform: scale(1.25);
          box-shadow: 0 0 10px rgba(2, 132, 199, 0.4);
        }

        /* Step Card style */
        .journey-step-card {
          padding: 32px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          position: relative;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        /* Top card colored line */
        .journey-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--secondary);
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          transition: background var(--transition-fast);
        }
        
        .timeline-card-container:nth-child(even) .journey-step-card::before {
          background: var(--accent);
        }

        .journey-step-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--secondary-light);
        }
        
        .timeline-card-container:nth-child(even):hover .journey-step-card {
          border-color: var(--accent-light);
        }

        /* Large embedded step numbers */
        .step-number-badge {
          position: absolute;
          top: 24px;
          right: 28px;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--border-color);
          opacity: 0.35;
          line-height: 1;
          font-family: var(--font-heading);
          pointer-events: none;
        }

        /* Mobile & Tablet media queries */
        @media screen and (max-width: 992px) {
          .journey-timeline::after {
            left: 30px;
          }

          .timeline-card-container {
            width: 100%;
            padding-left: 65px;
            padding-right: 20px;
          }

          .timeline-card-container.left, 
          .timeline-card-container.right {
            left: 0%;
          }

          .timeline-card-container::after {
            left: 19px !important;
            right: auto !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="section" style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Column */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                Patient Path
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.15', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Your Patient Journey
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '600px', marginBottom: '32px' }}>
                A clear, medically responsible pathway from first inquiry to consultation, testing, result interpretation, and follow-up care.
              </p>
              
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/appointments" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                  <Calendar size={18} /> Book Consultation
                </Link>
                <Link to="/appointments?action=upload" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
                  <Upload size={18} /> Upload Report
                </Link>
              </div>
            </div>

            {/* Right Column Summary Card */}
            <div className="card card-glass flex-col" style={{ padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="flex-row-center text-secondary mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)' }}>
                <HeartHandshake size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontWeight: 700 }}>5-Step Care Pathway</h3>
              <p className="small-text text-muted" style={{ lineHeight: '1.6', marginBottom: '24px' }}>
                We provide clinical-grade genetic support every step of the way, ensuring you receive professional oversight and responsible guidance.
              </p>
              
              <ul className="flex-col gap-3" style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 'auto' }}>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  🏥 Consultation-led pathway
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  🧬 Personalized test guidance
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  📊 Responsible report interpretation
                </li>
                <li className="xsmall-text flex-row gap-2 text-muted" style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  💙 Long-term clinical follow-up support
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Quick Summary Strip */}
      <section style={{ padding: '24px 0', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-4" style={{ gap: '20px' }}>
            <div className="card flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <div className="flex-row-center text-secondary" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)' }}>
                <PhoneCall size={14} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>1. Initial Inquiry</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Reach out via phone/web</p>
              </div>
            </div>
            <div className="card flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <div className="flex-row-center text-accent" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)' }}>
                <HelpCircle size={14} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>2. Consultation</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Clinical history review</p>
              </div>
            </div>
            <div className="card flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <div className="flex-row-center text-secondary" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)' }}>
                <Stethoscope size={14} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>3. Test Selection</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Personalized test filters</p>
              </div>
            </div>
            <div className="card flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <div className="flex-row-center text-accent" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)' }}>
                <HeartHandshake size={14} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>4. Results & Care</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Interpretation & guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Timeline Section */}
      <section className="section section-light" style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Care Protocol</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)' }}>The 5-Step Pathways Structure</h2>
            <p className="small-text text-muted" style={{ maxWidth: '640px', margin: '12px auto 0', lineHeight: '1.6' }}>
              A detailed overview of how patients navigate our diagnostic pipelines, ensuring safety and precision.
            </p>
          </div>

          <div className="journey-timeline">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const sideClass = idx % 2 === 0 ? 'left' : 'right';
              return (
                <div key={idx} className={`timeline-card-container ${sideClass}`}>
                  <div className="journey-step-card">
                    {/* Visual anchored number */}
                    <span className="step-number-badge">0{step.step}</span>
                    
                    {/* Header */}
                    <div className="flex-row align-center gap-3 mb-3">
                      <div className="flex-row-center text-secondary" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: idx % 2 === 0 ? 'var(--secondary)' : 'var(--accent)', flexShrink: 0 }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>{step.title}</h4>
                        <span className="xsmall-text text-accent" style={{ fontWeight: 600, color: idx % 2 === 0 ? 'var(--secondary)' : 'var(--accent)' }}>{step.subtitle}</span>
                      </div>
                    </div>
                    
                    {/* Body */}
                    <p className="small-text text-muted mb-4" style={{ lineHeight: '1.6' }}>{step.desc}</p>
                    
                    {/* Link */}
                    {step.ctaLink && (
                      <Link 
                        to={step.ctaLink} 
                        className="xsmall-text font-bold flex-row align-center gap-1" 
                        style={{ color: idx % 2 === 0 ? 'var(--secondary)' : 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                      >
                        {step.ctaText} <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Checklist and Patient Guidelines */}
      <section className="section" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-2" style={{ gap: '32px' }}>
            
            {/* Before Your Consultation */}
            <div className="card" style={{ padding: '32px', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <div className="flex-row-center text-secondary" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.08)' }}>
                  <Info size={18} />
                </div>
                <h3 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>Before Your Consultation</h3>
              </div>
              <p className="small-text text-muted mb-6">To ensure a comprehensive clinical evaluation, we recommend preparing the following:</p>
              
              <ul className="flex-col gap-3" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Bring previous genetic reports if available</span>
                </li>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Bring relevant medical reports (ECGs, blood tests, scan logs)</span>
                </li>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Share family history details (pedigree tree concerns)</span>
                </li>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Mention pregnancy status or timeline if relevant</span>
                </li>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Prepare your main questions and expectations</span>
                </li>
                <li className="xsmall-text text-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                  <span>✔️</span> <span>Upload reports before the appointment if possible</span>
                </li>
              </ul>
            </div>

            {/* After Your Results */}
            <div className="card" style={{ padding: '32px', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', borderLeft: '6px solid var(--secondary)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <div className="flex-row-center text-accent" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(15, 118, 110, 0.08)' }}>
                  <HeartHandshake size={18} />
                </div>
                <h3 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>After Your Results</h3>
              </div>
              <p className="small-text text-muted mb-4" style={{ lineHeight: '1.7' }}>
                Genetic screening and sequencing outcomes should always be interpreted with professional guidance. A high-risk or positive result does not equal a diagnosis, and should be discussed contextually.
              </p>
              <p className="small-text text-muted mb-4" style={{ lineHeight: '1.7' }}>
                Depending on the results, your follow-up care pathways may include:
              </p>
              <ul className="flex-col gap-2 xsmall-text text-muted pl-4" style={{ lineHeight: '1.6' }}>
                <li>Discussion of familial inheritance risks</li>
                <li>Personalized dietary and lifestyle guidance</li>
                <li>Confirmatory diagnostic procedures (e.g. amniocentesis for NIPT)</li>
                <li>Referrals to specialist physicians or monitoring coordinators</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Final bottom CTA Section */}
      <section className="section bg-secondary" style={{ padding: '96px 0' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Diagnostic Path</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Ready to start your genetic consultation journey?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Book an appointment or upload your report so the clinic can guide you through the next step.
          </p>
          <div className="flex-row-center gap-4 flex-wrap">
            <Link to="/appointments" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              <Calendar size={18} /> Book Appointment
            </Link>
            <Link to="/appointments?action=upload" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
              <Upload size={18} /> Upload Report
            </Link>
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
