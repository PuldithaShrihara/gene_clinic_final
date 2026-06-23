import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: "What is genetic counselling?",
      a: "Genetic counselling is professional guidance that helps individuals and families understand genetic risks, test options, possible results, and next steps."
    },
    {
      q: "What is wellness counselling?",
      a: "Wellness counselling supports personalized lifestyle, nutrition, fitness, and prevention-focused planning based on health goals, genetic information, and professional guidance."
    },
    {
      q: "What is genetic testing?",
      a: "Genetic testing is a medical test that identifies changes in chromosomes, genes, or proteins. It can help confirm or rule out certain conditions, identify carrier status, or support risk understanding."
    },
    {
      q: "What is Me360 Wellness Blueprint?",
      a: "The Me360 Wellness Blueprint is a DNA-based wellness profile that supports guidance on nutrition, fitness, weight management, detox, food sensitivity, health predisposition, and dementia-related awareness."
    },
    {
      q: "Is Me360 a diagnostic report?",
      a: "No. Me360 is not a diagnostic report. It is intended for wellness guidance and should be interpreted by qualified professionals."
    },
    {
      q: "What is NIPT?",
      a: "NIPT is a non-invasive prenatal screening test that uses maternal blood to assess the risk of selected chromosomal conditions during pregnancy."
    },
    {
      q: "Is NIPT diagnostic?",
      a: "No. NIPT is a screening test, not a diagnostic test. High-risk or unclear results may require further diagnostic confirmation."
    },
    {
      q: "From when can NIPT be performed?",
      a: "NIPT may be considered from at least 10 weeks of pregnancy, subject to clinical suitability and professional guidance."
    },
    {
      q: "Can I upload previous reports?",
      a: "Yes. You can upload previous genetic reports, medical reports, referral letters, or prescriptions during appointment booking."
    },
    {
      q: "Are online consultations available?",
      a: "Yes. Online video consultations are available for selected counselling and report interpretation services."
    },
    {
      q: "How can I book an appointment?",
      a: "You can use the Book Appointment page to submit your preferred consultation type, date, time, and contact details. Our team will contact you to confirm the appointment."
    },
    {
      q: "Is online payment available?",
      a: "Online payment gateway integration is planned for a future phase. At present, our team will contact you with confirmation and payment instructions after appointment submission."
    },
    {
      q: "Is my information confidential?",
      a: "Patient and client information should be handled confidentially and used only for appointment coordination, counselling, testing support, and follow-up communication."
    }
  ];

  return (
    <div className="faq-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Support & FAQ</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Frequently Asked Questions
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Answers to common questions about genetic counselling, wellness counselling, genetic testing, NIPT, appointments, report uploads, and online consultations.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                <ShieldAlert size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Medical Notice</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                FAQ answers are for general awareness and screening coordination guidance. They do not replace formal clinical consultations or professional medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="section section-light" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div className="flex-col gap-3">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-accordion-card card ${isOpen ? 'active-accordion' : ''}`}
                  style={{
                    padding: '20px 24px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    borderRadius: '16px'
                  }}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex-row justify-between align-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, lineHeight: '1.4', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <HelpCircle size={18} className="text-secondary" style={{ flexShrink: 0 }} />
                      {faq.q}
                    </h4>
                    <div className="text-muted" style={{ display: 'flex', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                      <p className="small-text text-muted" style={{ margin: 0, lineHeight: '1.6' }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions CTA */}
          <div className="card text-center" style={{ padding: '40px', marginTop: '60px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Ready to Get Started?</h3>
            <p className="small-text text-muted" style={{ maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              Select an option below to book your consultation, request genetic tests, or contact our support team.
            </p>
            <div className="flex-row justify-center gap-4" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/appointments" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Book Appointment
              </Link>
              <Link to="/request-genetic-test" className="btn btn-secondary" style={{ padding: '12px 28px' }}>
                Request Genetic Test
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ padding: '12px 28px' }}>
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
