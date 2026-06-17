import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldAlert, Heart, Calendar } from 'lucide-react';

export default function WhoWeHelp() {
  const patientCategories = [
    {
      title: 'Individuals with a Known Genetic Diagnosis',
      desc: 'Patients who have already received a molecular diagnosis and need guidance regarding symptom management, specialist referrals, and long-term care plans.'
    },
    {
      title: 'Families with Inherited Medical Conditions',
      desc: 'Families wishing to screen members for inherited conditions that run in the family, such as Thalassemia, inherited neuropathies, or muscular dystrophies.'
    },
    {
      title: 'Couples Planning Pregnancy',
      desc: 'Healthy couples who want pre-pregnancy carrier screening to identify recessive disease carrier status and assess potential risks to future children.'
    },
    {
      title: 'Pregnant Mothers with Genetic Concerns',
      desc: 'Mothers who have received atypical ultrasound findings, positive non-invasive prenatal screening (NIPT) results, or are concerned about age-related risks.'
    },
    {
      title: 'Children with Suspected Genetic Conditions',
      desc: 'Parents seeking answers for children who have developmental delays, learning challenges, unique physical features, or unexplained recurrent health problems.'
    },
    {
      title: 'Adults with Family History Concerns',
      desc: 'Individuals who have multiple family members with early-onset cardiac disorders, strokes, or cancers and want to know their own inherited risk profile.'
    },
    {
      title: 'Patients with Unclear Genetic Test Results',
      desc: 'Individuals who have received genetic reports from direct-to-consumer services or clinical labs listing complex variants (e.g., VUS) and need professional clarity.'
    },
    {
      title: 'Families Seeking Second Opinions',
      desc: 'Families wanting a detailed clinical review of their genetic diagnosis, counseling on prognosis, and recommendations on advanced testing alternatives.'
    },
    {
      title: 'Individuals Interested in Genomic Health Guidance',
      desc: 'Proactive individuals wishing to explore science-backed pharmacogenomics or preventative genomics to personalize health strategies.'
    }
  ];

  return (
    <div className="who-we-help-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">Patient Profiles</span>
          <h1 className="text-gradient">Who We Help</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            Clinical genetics provides clarity and answers for individuals and families at various health stages. See how our consultation services support different needs.
          </p>
        </div>
      </section>

      {/* Grid of Categories */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-3">
            {patientCategories.map((category, idx) => (
              <div key={idx} className="card card-accent hover-scale">
                <div className="category-check-icon mb-4">
                  <Check size={18} className="text-accent" />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{category.title}</h3>
                <p className="small-text">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="section">
        <div className="container grid grid-2 align-center">
          <div>
            <span className="badge badge-gold mb-4">Trust & Responsibility</span>
            <h2>A Safe and Supportive Environment</h2>
            <p className="mt-4">
              We understand that genetic questions can bring emotional weight. Whether you are dealing with a child’s developmental delays, planning a family after a loss, or exploring cancer risks, our consultations are private, compassionate, and conducted at your pace.
            </p>
            <p className="mt-4">
              We never rush you through reports. Our primary goal is to empower you with scientific facts, clear options, and continuous support.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="card card-glass flex-row gap-4 align-start">
              <ShieldAlert className="text-gold flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
              <div>
                <h4>Confidential & Secure</h4>
                <p className="small-text mt-1">
                  Your genetic information and consultation summaries are kept under strict medical confidentiality guidelines.
                </p>
              </div>
            </div>
            <div className="card card-glass flex-row gap-4 align-start">
              <Heart className="text-accent flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
              <div>
                <h4>Compassionate Counselling</h4>
                <p className="small-text mt-1">
                  We translate genetic jargon into everyday language, addressing emotional concerns alongside clinical findings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="section section-dark text-center">
        <div className="container">
          <h2>Find Out How Clinical Genetics Can Help You</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '12px auto 32px' }}>
            Book a dedicated consultation to evaluate your family medical history or analyze genetic testing reports.
          </p>
          <Link to="/appointments" className="btn btn-gold btn-lg">
            Request a Consultation <Calendar size={18} style={{ marginLeft: '4px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
