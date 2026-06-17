import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Info, HelpCircle, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Nipt() {
  const [providerOpen, setProviderOpen] = useState(false);
  
  const faqs = [
    { q: 'At what week of pregnancy can I take the NIPT test?', a: 'NIPT is generally applicable from 10 weeks of pregnancy, once fetal fraction levels in maternal blood are high enough for detection.' },
    { q: 'How is the sample collected?', a: 'It requires a simple maternal blood draw, usually collected in specialized cell-free DNA collection tubes (like Streck tubes) to preserve fetal DNA fraction.' },
    { q: 'What is the difference between screening and diagnosis?', a: 'NIPT is a screening test. It calculates the probability of a trisomy but does not confirm it. A high-risk result requires confirmation via diagnostic procedures like amniocentesis.' }
  ];

  const rejectionReasons = [
    'Broken, leaking, contaminated, or improperly packed sample tube',
    'Incorrect, unreadable, missing, or mismatched barcode or identification details',
    'Insufficient sample volume (usually less than 7-10ml of maternal blood)',
    'Severe haemolysis, clotting, lipemia, or bacterial contamination',
    'Improper shipment conditions (e.g., sample exposed to high temperatures)',
    'Inappropriate or expired collection tube (non-approved cfDNA tube types)',
    'Missing signed consent documentation or request form logs'
  ];

  return (
    <div className="nipt-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Prenatal Genetics</span>
          <h1 className="text-gradient">Non-Invasive Prenatal Screening</h1>
          <p className="lead-text mt-4">
            Professional genetic testing guidance for trisomy screenings from 10 weeks of pregnancy, backed by clinical geneticists.
          </p>
        </div>
      </section>

      {/* Main explanation & Wording */}
      <section className="section section-light">
        <div className="container grid grid-2">
          <div>
            <span className="badge badge-accent mb-4">Screening vs Diagnosis</span>
            <h2>What is NIPT?</h2>
            <p className="mt-4">
              Non-Invasive Prenatal Testing (NIPT) analyzes cell-free DNA (cfDNA) in maternal plasma to screen for fetal chromosomal aneuploidies.
            </p>
            <p className="mt-4">
              <strong>Important Clinical Disclaimer:</strong> NIPT is a screening test, not a diagnostic test. It cannot detect all genetic, structural, or developmental conditions. False positive and false negative results are possible. High-risk or abnormal results should always be discussed with a qualified medical professional and require confirmatory diagnostic testing (such as amniocentesis) before making clinical decisions.
            </p>
            <div className="mt-6 flex-row-center gap-4 flex-wrap">
              <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary">
                Book NIPT Consultation
              </Link>
            </div>
          </div>

          <div className="card card-glass">
            <h3>Screening Capabilities</h3>
            <ul className="styled-list mt-6">
              <li><strong>Trisomy 21:</strong> Down Syndrome screening</li>
              <li><strong>Trisomy 18:</strong> Edwards Syndrome screening</li>
              <li><strong>Trisomy 13:</strong> Patau Syndrome screening</li>
              <li><strong>Sex Chromosome Aneuploidies:</strong> Monosomy X (Turner Syndrome), Klinefelter, etc.</li>
              <li><strong>NIFTY / NIFTY Pro:</strong> Expanded microdeletion screens and monogenic conditions (NIFTY Mono).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Collection & Rejection list */}
      <section className="section">
        <div className="container grid grid-2">
          <div>
            <span className="badge badge-gold mb-4">Logistics & Safety</span>
            <h2>Sample Collection Overview</h2>
            <p className="mt-4">
              To guarantee test accuracy, maternal whole blood samples must be collected in approved cell-free DNA collection tubes (e.g. Streck or CoWin).
            </p>
            
            <div className="mt-6 flex-col gap-4">
              <div className="card card-glass" style={{ padding: '20px' }}>
                <h4>Whole Blood Requirements:</h4>
                <p className="xsmall-text mt-1 text-muted">
                  Label correctly, mix by gentle inversion (8-10 times) immediately to avoid clotting, and transport at 6°C - 35°C (never freeze whole blood).
                </p>
              </div>
              <div className="card card-glass" style={{ padding: '20px' }}>
                <h4>Plasma separation (if required):</h4>
                <p className="xsmall-text mt-1 text-muted">
                  Requires two-step centrifugation, transferring to sterile cryotubes, and shipping frozen on dry ice.
                </p>
              </div>
            </div>
          </div>

          <div className="card card-gold">
            <div className="flex-row-center gap-2 mb-4 text-gold">
              <ShieldAlert size={20} />
              <h3>Sample Rejection Criteria</h3>
            </div>
            <p className="xsmall-text text-muted mb-4">
              Samples will be rejected by partner laboratories if any of the following are observed:
            </p>
            <ul className="styled-list">
              {rejectionReasons.map((reason, idx) => (
                <li key={idx} className="xsmall-text mb-2">{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Limitations & Eligibility */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Eligibility & Clinical Limitations</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Specific clinical scenarios that require caution before requesting NIPT.
            </p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h4>Gestational Age</h4>
              <p className="small-text mt-4">
                Test is only valid starting from 10 completed weeks of gestation. Testing earlier increases the risk of low fetal fraction and sample failure.
              </p>
            </div>
            <div className="card">
              <h4>Maternal Factors</h4>
              <p className="small-text mt-4">
                Conditions such as recent maternal blood transfusions, organ transplants, malignancies, or maternal chromosomal abnormalities can distort cfDNA results.
              </p>
            </div>
            <div className="card">
              <h4>Multiple Pregnancies</h4>
              <p className="small-text mt-4">
                Twin pregnancies, vanishing twins, or donor oocyte pregnancies affect screening algorithms. NIPT Pro details must reflect zygosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Provider section */}
      <section className="section bg-secondary">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div 
            onClick={() => setProviderOpen(!providerOpen)}
            className="flex-row-between cursor-pointer border p-6 rounded-lg bg-primary"
            style={{ borderStyle: 'solid', borderColor: 'var(--border-color)' }}
          >
            <div className="flex-row-center gap-3">
              <FileText className="text-accent" size={24} />
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>For Healthcare Providers</h3>
            </div>
            {providerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {providerOpen && (
            <div className="card mt-4 animate-fade-in" style={{ borderTop: '4px solid var(--accent)' }}>
              <h4>Clinical Protocol for Sample Dispatch</h4>
              <p className="small-text mt-2 text-muted">
                Standard steps for clinic coordinators sending prenatal samples:
              </p>
              <ol className="mt-4 pl-6 xsmall-text text-muted" style={{ lineHeight: '1.8' }}>
                <li>Confirm informed prenatal consent is signed by the parent and physician.</li>
                <li>Confirm gestational age is verified via early ultrasound scan.</li>
                <li>Draw whole blood into cell-free DNA tubes, invert 10 times, label with double identifiers (Name & DOB).</li>
                <li>Pack sample in a biohazard bag with absorbent material, placing the request form in the side pouch.</li>
                <li>Arrange ambient transport (10-30°C). Do not expose whole blood to dry ice.</li>
                <li>Log sample dispatch in the clinic shipment log.</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card card-glass">
                <div className="flex-row-center gap-2 mb-4">
                  <HelpCircle size={18} className="text-accent" />
                  <h4>{faq.q}</h4>
                </div>
                <p className="small-text text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
