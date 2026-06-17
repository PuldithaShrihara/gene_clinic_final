import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Eye, ShieldCheck, Microscope, Award, Users } from 'lucide-react';

export default function Clinic() {
  const clinicCorePillars = [
    {
      title: 'Why Genetic Consultation Matters',
      desc: 'Genetic consultations help decode complicated medical traits. By evaluating symptoms alongside family pedigree risk models, Dr. Lahiru identifies candidate genes and determines if sequencing is necessary.',
      icon: ShieldCheck
    },
    {
      title: 'Role of Genetic Counselling',
      desc: 'Counseling acts as the human connection in genomics. Pre-test discussions clarify clinical expectations, while post-test counseling explains result implications for both the patient and their family.',
      icon: HeartHandshake
    },
    {
      title: 'Personalized Genomic Care',
      desc: 'Your DNA is unique. We translate sequencing data into customized medical surveillance actions, nutrition guidelines, and risk prevention choices.',
      icon: Award
    }
  ];

  return (
    <div className="clinic-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">GenSek Health Pvt Ltd</span>
          <h1 className="text-gradient">The Gene Clinic</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            A specialist clinical facility in Galle, Sri Lanka, offering professional DNA test planning, wellness blueprint interpretations, and genetic counseling under the direction of Dr. Lahiru Prabodha.
          </p>
        </div>
      </section>

      {/* About The Gene Clinic & GenSek */}
      <section className="section section-light">
        <div className="container grid grid-2">
          <div>
            <span className="badge badge-accent mb-4">Corporate & Clinical Profile</span>
            <h2>What The Gene Clinic Does</h2>
            <p className="mt-4">
              <strong>The Gene Clinic</strong> (directed by GenSek Health Pvt Ltd) stands at the intersection of laboratory genomics and clinical diagnostics. Rather than selling DNA tests directly, we guide families and doctors through the entire genetic diagnostic pathway.
            </p>
            <p className="mt-4">
              We assist patients in navigating carrier screening, prenatal diagnostic tests (including NIPT), exome sequencings, and gut microbiome panels. Our clinical focus ensures every genetic test matches an active diagnostic question and is backed by professional post-test counseling.
            </p>
          </div>
          <div className="flex-col justify-center gap-4">
            <div className="card card-glass flex-row-center gap-3">
              <Microscope size={20} className="text-accent" />
              <div>
                <h4>Clinical Genetic Testing Guidance</h4>
                <p className="small-text">Targeted panel selection to avoid unnecessary tests.</p>
              </div>
            </div>
            <div className="card card-glass flex-row-center gap-3">
              <Users size={20} className="text-gold" />
              <div>
                <h4>Family Risk Assessments</h4>
                <p className="small-text">Constructing detailed family tree pedigrees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Consultation Pillars */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Our Clinical Philosophy</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              How genetic counseling and testing shape healthcare decisions.
            </p>
          </div>
          <div className="grid grid-3">
            {clinicCorePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="card card-accent flex-col-card">
                  <div className="flex-row-center gap-3 mb-4">
                    <Icon className="text-accent" size={22} />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p className="small-text">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Dives into Core Areas */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Core Specialized Services</h2>
          </div>
          <div className="grid grid-2">
            <div className="card card-glass">
              <h3>Reproductive & Prenatal Genetics</h3>
              <p className="mt-4 small-text text-muted">
                Pre-pregnancy planning for carrier screening of recessive syndromes (like Thalassemia) and counseling regarding Non-Invasive Prenatal Testing (NIPT) results.
              </p>
            </div>
            <div className="card card-glass">
              <h3>Wellness Genomics & Wellness Blueprint</h3>
              <p className="mt-4 small-text text-muted">
                Evaluating metabolic markers, food sensitivity traits, and cardiovascular predispositions to formulate long-term lifestyle planning.
              </p>
            </div>
            <div className="card card-glass">
              <h3>Genetic Report Interpretation</h3>
              <p className="mt-4 small-text text-muted">
                Correlating complex molecular findings (such as VUS results) with clinical features to resolve diagnostic ambiguities.
              </p>
            </div>
            <div className="card card-glass">
              <h3>Follow-up & Referral Support</h3>
              <p className="mt-4 small-text text-muted">
                We coordinate with primary medical specialists to integrate genetic insights into your cardiological, oncological, or pediatric care programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galle Clinic CTA */}
      <section className="section text-center">
        <div className="container" style={{ maxWidth: '640px' }}>
          <span className="badge badge-gold mb-2">Scheduling</span>
          <h2>Visit The Gene Clinic in Galle</h2>
          <p className="mt-4 mb-8">
            Consultations are held by appointment at our office in Galle. Online video consultations are also available for patient convenience.
          </p>
          <div className="flex-row-center justify-center gap-4 flex-wrap">
            <Link to="/appointments" className="btn btn-primary">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
