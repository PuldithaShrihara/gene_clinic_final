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
      a: 'No, NIPT is a prenatal screening test. It calculates the statistical probability of a chromosomal condition but does not confirm a diagnosis. Any high-risk result requires confirmatory diagnostic testing (such as amniocentesis or CVS) before clinical decisions.' 
    },
    { 
      q: 'When can NIPT be done?', 
      a: 'NIPT is valid and can be performed starting from 10 completed weeks of pregnancy. Testing earlier is not recommended as the fetal DNA fraction in the mother\'s blood may be too low, leading to inconclusive results or sample failure.' 
    },
    { 
      q: 'What sample is needed?', 
      a: 'A simple maternal whole blood sample (usually 7-10ml) drawn from the arm. Fetal DNA fragments from the placenta circulate in the mother\'s bloodstream and are analyzed during the screening.' 
    },
    { 
      q: 'What does a high-risk result mean?', 
      a: 'A high-risk result indicates a higher probability that the pregnancy is affected by a screened chromosomal condition. It is not a definitive diagnosis. You will receive professional counselling to discuss options for confirmatory diagnostic testing.' 
    },
    { 
      q: 'Can NIPT detect all genetic conditions?', 
      a: 'No. NIPT screens specifically for selected chromosomal trisomies (21, 18, 13) and sex chromosome differences. It does not screen for structural physical abnormalities, brain/neural tube defects, or all genetic disorders.' 
    },
    { 
      q: 'Do I need a doctor consultation before testing?', 
      a: 'Yes. Pre-test genetic counselling with Dr. Lahiru Prabodha or a qualified medical professional is highly recommended to confirm gestational timing, review clinical family history, and ensure the test is suitable for your pregnancy.' 
    },
    { 
      q: 'How long does it take to receive results?', 
      a: 'Results are typically returned within 7 to 10 working days from the time the sample is processed at our partner laboratory.' 
    }
  ];

  const rejectionReasons = [
    'Broken, leaking, contaminated, or improperly packed sample tube',
    'Incorrect, unreadable, missing, or mismatched barcode or patient identifiers',
    'Insufficient sample volume (typically less than 7-10ml of maternal blood)',
    'Severe haemolysis, clotting, lipemia, or bacterial contamination of the sample',
    'Improper transport temperature (sample exposed to extreme heat or frozen)',
    'Inappropriate or expired collection tube (use of non-approved cfDNA tubes)',
    'Missing signed consent documentation or clinical request forms'
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="nipt-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Premium Hero Section */}
      <section className="section" style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left side */}
            <div className="flex-col" style={{ alignItems: 'flex-start' }}>
              <span className="badge badge-accent mb-4" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                Prenatal Genetics
              </span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)', lineHeight: '1.15', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Non-Invasive Prenatal Screening
              </h1>
              <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '600px', marginBottom: '32px' }}>
                Professional guidance for NIPT screening from 10 weeks of pregnancy, with clinical genetic counselling and responsible result interpretation.
              </p>
              
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                  <Calendar size={18} /> Book NIPT Consultation
                </Link>
                <a href="#what-is-nipt" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
                  Learn How It Works
                </a>
              </div>
            </div>

            {/* Right side - Premium Card Graphic */}
            <div className="card card-glass flex-col" style={{ padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
              <div className="flex-row-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)', marginBottom: '20px' }}>
                <Dna size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>NIPT Screen Overview</h3>
              <p className="small-text text-muted mb-6" style={{ lineHeight: '1.6' }}>
                A simple blood draw screening fetal cell-free DNA (cfDNA) circulating in maternal plasma to estimate chromosomal health probabilities.
              </p>
              
              <div className="grid grid-2 gap-3 w-full" style={{ marginTop: 'auto' }}>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  🔹 From 10 weeks
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  🩸 Blood sample based
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⚖️ Screening test
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  🩺 Clinical guidance
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section style={{ padding: '24px 0', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-4" style={{ gap: '20px' }}>
            <div className="flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <CheckCircle2 size={18} className="text-accent" />
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem' }}>From 10 Weeks</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Early prenatal screening</p>
              </div>
            </div>
            <div className="flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <CheckCircle2 size={18} className="text-accent" />
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Maternal Blood Sample</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Safe and non-invasive draw</p>
              </div>
            </div>
            <div className="flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <CheckCircle2 size={18} className="text-accent" />
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Trisomy Screening</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Detect probability factors</p>
              </div>
            </div>
            <div className="flex-row align-center gap-3" style={{ padding: '12px', borderRadius: '12px' }}>
              <CheckCircle2 size={18} className="text-accent" />
              <div>
                <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Genetic Counselling</h5>
                <p className="xsmall-text text-muted" style={{ margin: 0 }}>Qualified medical support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What is NIPT? */}
      <section id="what-is-nipt" className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div>
              <span className="badge badge-accent mb-3">About The Test</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', marginBottom: '20px' }}>What is NIPT?</h2>
              <p className="lead-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '16px' }}>
                NIPT (Non-Invasive Prenatal Testing) is a cell-free DNA screening option that evaluates chromosomal risk metrics using maternal blood plasma.
              </p>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '24px' }}>
                NIPT is a screening test that analyzes cell-free fetal DNA circulating in the mother's plasma. It determines the probability of specific chromosomal configurations in the pregnancy, rather than confirming their presence definitively. It does not carry the safety risks associated with invasive prenatal procedures.
              </p>
            </div>
            
            <div className="card flex-col" style={{ padding: '32px', background: 'rgba(239, 68, 68, 0.03)', borderColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '20px' }}>
              <div className="flex-row align-center gap-3 text-gold" style={{ marginBottom: '16px', color: '#dc2626' }}>
                <ShieldAlert size={28} />
                <h4 style={{ margin: 0, color: '#dc2626', fontSize: '1.15rem' }}>Important Medical Notice</h4>
              </div>
              <p className="small-text" style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                NIPT is a screening test, not a diagnostic test. High-risk results should always be discussed with a qualified medical professional (such as a clinical geneticist) and may require confirmatory diagnostic testing (like amniocentesis or CVS) before clinical decisions can be made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What can NIPT screen for? */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Screening Scope</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)' }}>What can NIPT screen for?</h2>
            <p className="small-text text-muted" style={{ maxWidth: '680px', margin: '12px auto 0', lineHeight: '1.7' }}>
              NIPT screens for common chromosomal conditions and optional anomalies depending on the selected test depth. Screening availability is subject to the specific test panel chosen.
            </p>
          </div>
          
          <div className="grid grid-3" style={{ gap: '24px' }}>
            <div className="card card-glass" style={{ padding: '28px', transition: 'transform 0.3s' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem' }}>Trisomy 21</h4>
                <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>Down Syndrome</span>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for an extra copy of chromosome 21, the most common cause of developmental delays and intellectual differences.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem' }}>Trisomy 18</h4>
                <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>Edwards Syndrome</span>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for an extra copy of chromosome 18. This condition is associated with severe physical and physiological differences.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem' }}>Trisomy 13</h4>
                <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>Patau Syndrome</span>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for an extra copy of chromosome 13. Associated with structural heart, neurological, and physical developmental issues.
              </p>
            </div>

            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem' }}>Sex Chromosomes</h4>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Optional</span>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for atypical configurations such as Monosomy X (Turner Syndrome), XXY (Klinefelter Syndrome), or extra X/Y chromosomes.
              </p>
            </div>

            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem' }}>Microdeletions</h4>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Optional</span>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screens for missing chromosomal pieces (e.g. DiGeorge, Angelman, Prader-Willi syndromes) depending on custom expanded test parameters.
              </p>
            </div>

            <div className="card card-glass" style={{ padding: '28px', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
              <div className="flex-row-between mb-4">
                <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary)' }}>Test Limitations</h4>
                <Info size={16} className="text-accent" />
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Screening availability and options depend on the selected test type. Suitability should be discussed during pre-test counselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Who may consider NIPT? */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-gold mb-3">Target Eligibility</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)' }}>Who may consider NIPT?</h2>
            <p className="small-text text-muted" style={{ maxWidth: '680px', margin: '12px auto 0', lineHeight: '1.7' }}>
              NIPT can be requested by any pregnant mother starting from week 10, though certain clinical indications make prenatal screening particularly helpful.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '24px' }}>
            <div className="card flex-col align-start" style={{ padding: '24px' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <CheckCircle2 size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Early Prenatal Seekers</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Couples seeking highly accurate, non-invasive risk screening at the start of pregnancy (from week 10 onwards).
              </p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '24px' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <Users size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Advanced Maternal Age</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Recommended where the maternal age is 35 years or older at delivery, as statistical trisomy probabilities naturally increase.
              </p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '24px' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <Stethoscope size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Atypical Ultrasound Findings</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                When routine prenatal ultrasound scans or biochemical screens show atypical results that require further clinical genetic guidance.
              </p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '24px' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <AlertTriangle size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Family History Risks</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Where there is a medical family history of chromosomal microdeletions, aneuploidies, or previous pregnancies with genetic conditions.
              </p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '24px' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <Heart size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>IVF or Egg Donor Cases</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                Assisted reproductive pregnancies where precision algorithms must account for specific donor conditions or twin parameters.
              </p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '24px', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
              <div className="flex-row-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--secondary)' }}>
                <Info size={20} className="text-accent" />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Clinical Assessment Required</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6' }}>
                NIPT suitability should be confirmed by a qualified medical practitioner before proceeding with sample collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: NIPT Patient Journey */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Process Protocol</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)' }}>NIPT Patient Journey</h2>
            <p className="small-text text-muted" style={{ maxWidth: '680px', margin: '12px auto 0', lineHeight: '1.7' }}>
              A straightforward step-by-step pathway from consultation to receiving responsible professional genetics reports.
            </p>
          </div>

          <div className="grid grid-5-cols" style={{ gap: '20px' }}>
            <div className="card flex-col align-start" style={{ padding: '20px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-color)', position: 'absolute', top: '16px', right: '16px', lineHeight: 1 }}>01</span>
              <div className="flex-row-center mb-4" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                <Calendar size={16} />
              </div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>1. Book Consultation</h5>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5' }}>Schedule a consultation to discuss test eligibility.</p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '20px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-color)', position: 'absolute', top: '16px', right: '16px', lineHeight: 1 }}>02</span>
              <div className="flex-row-center mb-4" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                <ClipboardCheck size={16} />
              </div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>2. Clinical History</h5>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5' }}>Review pregnancy timeline and family clinical logs.</p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '20px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-color)', position: 'absolute', top: '16px', right: '16px', lineHeight: 1 }}>03</span>
              <div className="flex-row-center mb-4" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                <Dna size={16} />
              </div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>3. Select Test Option</h5>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5' }}>Choose standard screening or expanded microdeletion options.</p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '20px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-color)', position: 'absolute', top: '16px', right: '16px', lineHeight: 1 }}>04</span>
              <div className="flex-row-center mb-4" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                <Heart size={16} />
              </div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>4. Blood Collection</h5>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5' }}>Safe collection of maternal blood in approved cfDNA tubes.</p>
            </div>

            <div className="card flex-col align-start" style={{ padding: '20px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-color)', position: 'absolute', top: '16px', right: '16px', lineHeight: 1 }}>05</span>
              <div className="flex-row-center mb-4" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                <FileText size={16} />
              </div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>5. Professional Guidance</h5>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5' }}>Review reports with responsible medical interpretation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Important Limitations */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="card" style={{ padding: '36px', borderLeft: '6px solid var(--gold)', background: 'var(--bg-tertiary)' }}>
            <div className="flex-row align-center gap-3 text-gold mb-4" style={{ color: 'var(--gold)' }}>
              <AlertTriangle size={28} />
              <h3 style={{ margin: 0, fontSize: '1.35rem' }}>Important Limitations & Screening Facts</h3>
            </div>
            
            <p className="small-text text-muted mb-6" style={{ lineHeight: '1.7' }}>
              A responsible prenatal screening path requires understanding what NIPT can and cannot do:
            </p>
            
            <ul className="styled-list flex-col gap-3" style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li className="xsmall-text flex-row gap-2 text-muted" style={{ lineHeight: '1.6' }}>
                ✔️ <strong>Screening Test Only:</strong> NIPT estimates probability metrics. It does not provide diagnostic certainty or act as a confirmatory test.
              </li>
              <li className="xsmall-text flex-row gap-2 text-muted" style={{ lineHeight: '1.6' }}>
                ✔️ <strong>No Structural Detection:</strong> It does not screen for developmental abnormalities, physical mutations, or neural tube defects (e.g. spina bifida).
              </li>
              <li className="xsmall-text flex-row gap-2 text-muted" style={{ lineHeight: '1.6' }}>
                ✔️ <strong>Biological Variance:</strong> False positives and false negatives, although statistically rare, are biologically possible.
              </li>
              <li className="xsmall-text flex-row gap-2 text-muted" style={{ lineHeight: '1.6' }}>
                ✔️ <strong>Maternal & Twin Factors:</strong> Maternal chromosomal patterns, malignancies, donor details, or twin factors may impact screening calculations.
              </li>
              <li className="xsmall-text flex-row gap-2 text-muted" style={{ lineHeight: '1.6' }}>
                ✔️ <strong>Confirmatory Path:</strong> High-risk screening flags require professional clinical genetic evaluation and confirmation via invasive diagnostics where appropriate.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Sample Collection Overview */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-3">Clinical Protocols</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)' }}>Sample Collection Overview</h2>
            <p className="small-text text-muted" style={{ maxWidth: '680px', margin: '12px auto 0', lineHeight: '1.7' }}>
              Patient blood collection must follow strict laboratory guidelines to preserve cell-free DNA fractions.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: '32px' }}>
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <div className="flex-row-center" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                  <CheckCircle2 size={18} />
                </div>
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>1. Whole Blood Sample</h4>
              </div>
              <ul className="styled-list flex-col gap-2 xsmall-text text-muted" style={{ paddingLeft: 0, listStyle: 'none' }}>
                <li>🔹 Collected using approved cell-free DNA transport tubes (e.g. Streck) where applicable.</li>
                <li>🔹 Correct tube labelling, double identifiers, and consent verification required.</li>
                <li>🔹 Maintain at ambient room temperature (do not freeze whole blood).</li>
              </ul>
            </div>

            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <div className="flex-row-center" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
                  <CheckCircle2 size={18} />
                </div>
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>2. Plasma Sample</h4>
              </div>
              <ul className="styled-list flex-col gap-2 xsmall-text text-muted" style={{ paddingLeft: 0, listStyle: 'none' }}>
                <li>🔹 Centrifugation, separation, and cryotube storage should follow approved laboratory protocols.</li>
                <li>🔹 Correct temperature management (frozen transport on dry ice) is important for plasma shipment.</li>
                <li>🔹 Utilized specifically when clinical testing pipelines request plasma aliquots.</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center xsmall-text text-muted mt-8" style={{ fontStyle: 'italic' }}>
            Detailed sample handling and transport protocol sheets are available for clinical coordinators below.
          </p>
        </div>
      </section>

      {/* Collapsible Provider section */}
      <section className="section" style={{ padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div 
            onClick={() => setProviderOpen(!providerOpen)}
            className="flex-row-between cursor-pointer border p-6 rounded-lg bg-secondary"
            style={{ borderStyle: 'solid', borderColor: 'var(--border-color)', transition: 'background-color var(--transition-fast)' }}
          >
            <div className="flex-row align-center gap-3">
              <FileText className="text-accent" size={22} />
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>For Healthcare Providers: Transport & Dispatch</h3>
            </div>
            {providerOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
 
          {providerOpen && (
            <div className="card mt-4 animate-fade-in" style={{ padding: '28px', borderTop: '4px solid var(--accent)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Clinical Protocol for Sample Dispatch</h4>
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
                <div className="flex-row-between align-center">
                  <div className="flex-row align-center gap-3">
                    <HelpCircle size={18} className="text-accent" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 600 }}>{faq.q}</h4>
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
      <section className="section bg-secondary" style={{ padding: '96px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Genetic Support</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Need guidance on prenatal genetic screening?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Book a consultation to understand whether NIPT is suitable for your pregnancy and how to interpret results responsibly.
          </p>
          <div className="flex-row-center gap-4 flex-wrap">
            <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Book NIPT Consultation
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
              Contact The Gene Clinic
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
