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
          <span className="badge badge-accent mb-4">Led by Dr. L. B. Lahiru Prabodha</span>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: '1.2' }}>
            The Gene Clinic by GenSek Health Private Limited
          </h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0', color: 'var(--text-muted)' }}>
            A specialist clinical facility in Galle, Sri Lanka, offering professional DNA test planning, wellness blueprint interpretations, and genetic counseling under the direction of Dr. L. B. Lahiru Prabodha.
          </p>
        </div>
      </section>

      {/* Our Identity Section */}
      <section className="section" style={{ padding: '48px 0 24px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-10">
            <span className="badge badge-accent mb-2">Credentials & Scope</span>
            <h2>Our Identity</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0', color: 'var(--text-muted)' }}>
              Core professional credentials, platform brand definition, and corporate representation.
            </p>
          </div>
          
          <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Card 1: Doctor */}
            <div className="card card-glass" style={{ padding: '28px', borderTop: '4px solid var(--accent)' }}>
              <span className="badge badge-accent mb-3">Doctor</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Dr. L. B. Lahiru Prabodha</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', margin: 0 }}>
                Clinical Geneticist and Genetic Counsellor
              </p>
            </div>

            {/* Card 2: Brand */}
            <div className="card card-glass" style={{ padding: '28px', borderTop: '4px solid var(--secondary)' }}>
              <span className="badge badge-secondary mb-3">Brand</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>The Gene Clinic</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', margin: 0 }}>
                A genetics and wellness counselling service platform
              </p>
            </div>

            {/* Card 3: Company */}
            <div className="card card-glass" style={{ padding: '28px', borderTop: '4px solid var(--accent)' }}>
              <span className="badge badge-accent mb-3">Company</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>GenSek Health Private Limited</h4>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', margin: 0 }}>
                The company supporting The Gene Clinic services and operations
              </p>
            </div>
          </div>
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

      {/* Connecting Testing, Counselling & Clinical Management */}
      <section className="section bg-secondary border-top border-bottom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="card card-glass" style={{ padding: '40px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
            
            <span className="badge badge-accent mb-4">Integrated Care Model</span>
            <h2 className="mb-4">Connecting Laboratory Testing, Counselling & Clinical Management</h2>
            <p className="lead-text text-muted" style={{ lineHeight: '1.7', marginBottom: '20px' }}>
              At The Gene Clinic, we bridge the gap between raw laboratory molecular testing and active clinical management. We believe that genetic testing is only one component of a larger clinical journey. 
            </p>
            <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '20px' }}>
              Our structured approach ensures that testing is preceded by <strong>pre-test counselling</strong> to clarify screening parameters and expectations. Following sample collection and processing in accredited molecular diagnostic laboratories, we perform a detailed <strong>clinical interpretation</strong> of the variants detected, correlating findings directly with the patient's phenotype and pedigree history.
            </p>
            <p className="small-text text-muted" style={{ lineHeight: '1.7', margin: 0 }}>
              The final and most crucial step is translating these insights into a <strong>personalized management plan</strong>. We collaborate with primary care doctors and specialists to outline precise medical surveillance, lifestyle adjustments, and family screening recommendations—guiding you safely through every step of your health journey.
            </p>
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
