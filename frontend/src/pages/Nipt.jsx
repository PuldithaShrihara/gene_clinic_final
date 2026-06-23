import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, 
  ShieldAlert, 
  Info, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Stethoscope, 
  AlertTriangle, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

export default function Nipt() {
  const [providerOpen, setProviderOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { 
      q: 'Is NIPT a diagnostic test?', 
      a: 'No. NIPT (Non-Invasive Prenatal Testing) is a screening test. It calculates the statistical probability of a chromosomal variant but does not confirm a definitive clinical diagnosis. Any high-risk screening result must be verified through confirmatory diagnostic testing (like amniocentesis or chorionic villus sampling - CVS) before making medical decisions.' 
    },
    { 
      q: 'Why is the 10-week gestational timing so important?', 
      a: 'Testing must occur only after 10 completed weeks of gestation (verified by ultrasound). Before 10 weeks, the concentration of fetal cell-free DNA (fetal fraction) in the maternal blood is often too low, which can lead to test failures, inconclusive results, or false negatives.' 
    },
    { 
      q: 'What is required for the informed consent process?', 
      a: 'A signed clinical informed consent form is mandatory. This document confirms the patient understands the screening nature of the test, its accuracy parameters, biological limitations, and the data protection guidelines covering their genomic data.' 
    },
    { 
      q: 'What is the NIFTY Mono screen?', 
      a: 'The NIFTY Mono is an advanced panel that screens for specific dominant monogenic (single-gene) conditions—such as skeletal dysplasias, Noonan syndrome, and Rett syndrome. These conditions are associated with paternal age factors and are not detected by standard NIPT chromosomal aneuploidy tests.' 
    },
    { 
      q: 'Who is suitable for NIFTY prenatal screens?', 
      a: 'Suitable for singleton pregnancies, twin pregnancies, and IVF (including donor egg) pregnancies. It is not suitable for patients with a history of malignancies, organ transplants, stem cell therapy, or maternal chromosomal abnormalities.' 
    },
    { 
      q: 'What are the main sample rejection reasons?', 
      a: 'Common reasons include sample collection in incorrect/expired tubes (approved Streck cfDNA tubes are mandatory), insufficient blood volume (less than 7-10ml), extreme transport temperatures (ambient storage is required; never freeze), or incomplete consent documentation.' 
    }
  ];

  const rejectionReasons = [
    'Broken, leaking, contaminated, or improperly packed sample tube',
    'Incorrect, unreadable, missing, or mismatched barcode or patient identifiers',
    'Insufficient sample volume (typically less than 7-10ml of maternal blood)',
    'Severe haemolysis, clotting, lipemia, or bacterial contamination of the sample',
    'Improper transport temperature (sample exposed to extreme heat or frozen)',
    'Inappropriate or expired collection tube (use of approved cfDNA tubes is mandatory)',
    'Missing signed consent documentation or clinical request forms'
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="nipt-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Premium Hero Section */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left side */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4">Prenatal Diagnostics Coordination</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)', lineHeight: '1.15', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Non-Invasive Prenatal Testing (NIPT)
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '32px' }}>
                Professional coordination, pre-test clinical genetic counselling, and responsible report interpretation for the NIFTY series screens from 10 weeks of pregnancy.
              </p>
              
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                  <Calendar size={18} /> Book NIPT Consultation
                </Link>
                <Link to="/request-genetic-test" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                  Request NIPT Screening
                </Link>
              </div>
            </div>

            {/* Right side - Premium Card Graphic */}
            <div className="card card-glass flex-col" style={{ padding: '32px', position: 'relative' }}>
              <div className="flex-row-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)', marginBottom: '20px', display: 'flex' }}>
                <Dna size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 700 }}>NIFTY Screen Overview</h3>
              <p className="small-text text-muted mb-6" style={{ lineHeight: '1.6' }}>
                A simple, non-invasive maternal blood draw screening placental cell-free DNA (cfDNA) to assess fetal chromosomal health parameters.
              </p>
              
              <div className="grid grid-2 gap-3 w-full" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  🔹 Week 10+ Timing
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  🩸 7-10ml Blood Draw
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⚖️ Screening Method
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✍️ Signed Consent
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Concept Description: Screening vs Diagnostic */}
      <section id="what-is-nipt" className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-3">Screening vs. Diagnostic</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', fontWeight: 700, marginBottom: '20px' }}>Understanding Prenatal Screening</h2>
              <p className="lead-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '16px' }}>
                It is clinically vital to distinguish between a prenatal screening test and a confirmatory diagnostic test.
              </p>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                <strong>NIPT is a screening test.</strong> It evaluates circulating cell-free fetal DNA fragments from the placenta in the maternal bloodstream to calculate the probability of chromosomal trisomies. It does not provide absolute diagnostic certainty.
              </p>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '0' }}>
                <strong>Confirmatory diagnosis</strong> requires invasive procedures such as Amniocentesis or Chorionic Villus Sampling (CVS). These diagnostic tests analyze actual fetal cells, carrying a small procedure-related risk, but provide a definitive clinical diagnosis.
              </p>
            </div>
            
            <div className="card flex-col" style={{ padding: '36px', background: 'rgba(239, 68, 68, 0.03)', borderColor: 'rgba(239, 68, 68, 0.15)', borderRadius: '20px', display: 'flex', gap: '16px' }}>
              <div className="flex-row align-center gap-3 text-gold" style={{ display: 'flex', alignItems: 'center', color: '#dc2626' }}>
                <ShieldAlert size={28} />
                <h4 style={{ margin: 0, color: '#dc2626', fontSize: '1.15rem', fontWeight: 700 }}>Clinical Safety Notice</h4>
              </div>
              <p className="small-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                High-risk screening results must never be interpreted as a definitive diagnosis or used as the sole basis for clinical decisions. Professional genetic counselling is required to review history, coordinate confirmatory testing options, and guide management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NIFTY Series & NIFTY Mono Options */}
      <section className="section section-light" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2">Screening Options</span>
            <h2>The NIFTY Series Prenatal Screens</h2>
            <p className="small-text text-muted" style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              We coordinate sample dispatch for standard chromosomal aneuploidies as well as advanced single-gene disorder screens.
            </p>
          </div>

          <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>NIFTY Standard</h4>
              <span className="badge badge-accent mb-4">Core Chromosomes</span>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for the three primary fetal chromosomal aneuploidies: Trisomy 21 (Down Syndrome), Trisomy 18 (Edwards Syndrome), and Trisomy 13 (Patau Syndrome).
              </p>
            </div>

            <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>NIFTY Plus</h4>
              <span className="badge badge-accent mb-4">Expanded Panel</span>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Includes screening for the core trisomies, sex chromosome aneuploidies (XO, XXY, XXX, XYY), and selected chromosomal microdeletions/duplications.
              </p>
            </div>

            <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px' }} className="text-accent"><Info size={20} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>NIFTY Mono</h4>
              <span className="badge badge-gold mb-4">Monogenic Panel</span>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Advanced screening for 20+ dominant single-gene disorders (monogenic conditions) such as achondroplasia, Noonan syndrome, and Rett syndrome—often associated with paternal age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suitability & Consent Guidelines */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Suitability Criteria */}
            <div className="card" style={{ padding: '36px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>Suitability & Criteria</h3>
              
              <div className="flex-col gap-4">
                <div>
                  <h5 style={{ margin: '0 0 6px', fontSize: '0.92rem', fontWeight: 700 }}>Singleton & Twin Pregnancies</h5>
                  <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                    Highly suitable for singleton gestations and twin gestations (both identical and fraternal). Accuracy values remain high across standard trisomy screens.
                  </p>
                </div>
                <div>
                  <h5 style={{ margin: '0 0 6px', fontSize: '0.92rem', fontWeight: 700 }}>IVF & Egg Donor Pregnancies</h5>
                  <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                    Suitable for pregnancies achieved via in vitro fertilization (IVF), including self-egg, donor-egg, and surrogate pregnancy options.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <h5 style={{ margin: '0 0 6px', fontSize: '0.92rem', fontWeight: 700 }} className="text-gold">Exclusion Criteria</h5>
                  <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                    NIPT is <strong>not suitable</strong> for patients who have undergone organ transplants, stem cell therapy, recent immunotherapy, allogeneic blood transfusions within the last 12 months, or mothers with diagnosed chromosomal abnormalities/malignancies.
                  </p>
                </div>
              </div>
            </div>

            {/* Consent & Counseling Requirements */}
            <div className="card" style={{ padding: '36px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>Mandatory Consent & Counselling</h3>
              
              <div className="flex-col gap-4">
                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <ClipboardCheck size={20} className="text-accent flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.92rem', fontWeight: 700 }}>Informed Consent</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      A signed, legal informed consent document is mandatory before sample draw. Patients must be fully briefed on the test's scope, detection limitations, potential false positives/negatives, and confirmatory options.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <Users size={20} className="text-accent flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.92rem', fontWeight: 700 }}>Pre-Test Counselling</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Counselling by Dr. Lahiru Prabodha confirms correct gestational age (10+ weeks verified by ultrasound), evaluates family histories for microdeletions or genetic syndromes, and aligns the appropriate panel choice.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <FileText size={20} className="text-accent flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.92rem', fontWeight: 700 }}>Post-Test Interpretation</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Once results are returned, a structured review session explains low-risk reassurance levels or guides next-step referral pathways in the event of high-risk flags.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Collection Logistics & Rejection Criteria */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Logistics */}
            <div>
              <span className="badge badge-accent mb-3">Laboratory Protocols</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '20px' }}>Sample Collection Logistics</h2>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '20px' }}>
                All prenatal screening samples coordinate through strict logistics pathways. Fetal cell-free DNA fractions must be preserved intact from sample collection to extraction.
              </p>
              
              <div className="flex-col gap-4">
                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="flex-row-center text-accent" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(15, 118, 110, 0.08)', display: 'flex' }}>1</div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 700 }}>Approved Collection Tubes</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Draw 7–10ml of maternal blood strictly in approved cell-free DNA stabilizing tubes (e.g. Streck tubes). Standard gel or EDTA tubes are not acceptable.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="flex-row-center text-accent" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(15, 118, 110, 0.08)', display: 'flex' }}>2</div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 700 }}>Temperature Logging</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Store and transport whole blood samples at ambient room temperature (10°C–30°C). <strong>Never freeze whole blood samples</strong> or pack them directly against ice, as cold temperatures cause maternal blood cell lysis, diluting the fetal DNA fraction.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="flex-row-center text-accent" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(15, 118, 110, 0.08)', display: 'flex' }}>3</div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 700 }}>Prompt Dispatch</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Pack samples securely in secondary biohazard mailers and dispatch them immediately. Processing must begin within the stabilizing tube window to ensure high-quality sequencing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection Criteria */}
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-row align-center gap-2 mb-4 text-gold" style={{ display: 'flex', alignItems: 'center', color: 'var(--gold)' }}>
                <AlertTriangle size={20} />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Sample Rejection Reasons</h4>
              </div>
              
              <ul className="flex-col gap-3 xsmall-text text-muted" style={{ listStyleType: 'disc', paddingLeft: '18px', margin: 0, lineHeight: '1.5' }}>
                {rejectionReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Collapsible Provider Transport Instructions */}
      <section className="section" style={{ padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div 
            onClick={() => setProviderOpen(!providerOpen)}
            className="flex-row-between cursor-pointer border p-6 rounded-lg bg-secondary"
            style={{ borderStyle: 'solid', borderColor: 'var(--border-color)', transition: 'background-color var(--transition-fast)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div className="flex-row align-center gap-3" style={{ display: 'flex', alignItems: 'center' }}>
              <FileText className="text-accent" size={22} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>For Healthcare Providers: Transport & Dispatch</h3>
            </div>
            {providerOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
 
          {providerOpen && (
            <div className="card mt-4 animate-fade-in" style={{ padding: '28px', borderTop: '4px solid var(--accent)', background: 'var(--bg-secondary)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', fontWeight: 700 }}>Clinical Protocol for Sample Dispatch</h4>
              <p className="xsmall-text text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Standard operating procedures for clinical staff when dispatching prenatal screening samples:
              </p>
              <ol className="flex-col gap-2 xsmall-text text-muted pl-6" style={{ lineHeight: '1.7' }}>
                <li>Ensure informed consent has been discussed and signed by the patient and referring practitioner.</li>
                <li>Confirm early ultrasound scan details reflect estimated gestational age &gt; 10 weeks.</li>
                <li>Collect blood into approved tubes, invert gently 8-10 times, and label with double patient identifiers.</li>
                <li>Secure tubes inside primary clinical biohazard packaging with absorbent materials.</li>
                <li>Dispatch under ambient room temperature logs (10-30°C). Do not place whole blood on ice.</li>
                <li>Confirm details match rejection criteria checklists before shipping.</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* FAQs section */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Common Inquiries</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)' }}>Frequently Asked Questions</h2>
          </div>
          
          <div className="flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="card card-glass" 
                style={{ padding: '20px 24px', border: '1px solid var(--border-color)', borderRadius: '16px', cursor: 'pointer' }}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex-row-between align-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="flex-row align-center gap-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <HelpCircle size={18} className="text-accent" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>{faq.q}</h4>
                  </div>
                  {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {activeFaq === idx && (
                  <div className="mt-4 pt-4 border-top animate-fade-in" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <p className="small-text text-muted" style={{ lineHeight: '1.7', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-secondary" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Genetic Support</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Need guidance on prenatal genetic screening?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Book a consultation to understand whether NIPT is suitable for your pregnancy and how to interpret results responsibly.
          </p>
          <div className="flex-row-center gap-4 flex-wrap" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Book NIPT Consultation
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
              Contact The Gene Clinic
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
