import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Microscope, BookOpen, Presentation, Calendar, Landmark, CheckCircle } from 'lucide-react';

export default function About() {
  const qualifications = [
    { title: 'MBBS', authority: 'Bachelor of Medicine, Bachelor of Surgery', year: 'Medical Graduate' },
    { title: 'MPhil', authority: 'Master of Philosophy (Genetics Research Focus)', year: 'Postgraduate Degree' },
    { title: 'MSc Clinical Genetics', authority: 'Specialist Clinical Genetics & Counselling Curriculum', year: 'Clinical Specialty Degree' }
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Intro Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container profile-grid">
          <div className="profile-image-container">
            <div className="avatar-placeholder">LP</div>
          </div>
          <div className="profile-info">
            <span className="badge badge-accent mb-4">Clinical Geneticist Profile</span>
            <h1 className="text-gradient" style={{ fontSize: '2.6rem', marginBottom: '12px' }}>Dr. L. B. Lahiru Prabodha</h1>
            <h3>MBBS, MPhil, MSc Clinical Genetics</h3>
            <p className="lead-text mt-4">
              Clinical Geneticist, Genetic Counselor, Senior Lecturer, and Head of the Molecular Genetic Laboratory at the Faculty of Medicine, University of Ruhuna, Galle, Sri Lanka. Director of GenSek Health Pvt Ltd.
            </p>
            <div className="mt-8 flex-row-center gap-4 flex-wrap">
              <Link to="/appointments" className="btn btn-primary">
                Book Consultation <Calendar size={16} />
              </Link>
              <a href="#qualifications" className="btn btn-secondary">
                Qualifications & Academia
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="section section-light" id="qualifications">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Qualifications & Credentials</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Academic foundations establishing clinical competence and research capability.
            </p>
          </div>
          <div className="grid grid-3">
            {qualifications.map((q, idx) => (
              <div key={idx} className="card card-accent text-center">
                <div className="step-num">{q.title}</div>
                <h3 className="mt-4">{q.authority}</h3>
                <p className="small-text mt-2 text-muted">{q.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specific Experience Panels */}
      <section className="section">
        <div className="container grid grid-2">
          {/* Genetic Counselling */}
          <div className="card">
            <Landmark size={24} className="text-gold mb-4" />
            <h3>University of Ruhuna Academic Role</h3>
            <p className="mt-4">
              Serving as a Senior Lecturer, Dr. Lahiru directs the clinical genetics curricula for undergraduate and postgraduate medical modules. He fosters genetics research, guiding students in cytogenetics, Sanger sequencing, and variant databases.
            </p>
          </div>
          {/* Molecular Genetics Lab */}
          <div className="card card-accent">
            <Microscope size={24} className="text-accent mb-4" />
            <h3>Head, Molecular Genetic Laboratory</h3>
            <p className="mt-4">
              Directing the Faculty of Medicine's specialized Molecular Genetic Laboratory. Under his supervision, the laboratory develops sequencing protocols, karyotype analysis workflows, and evaluates PCR/molecular diagnostic indications.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Interest */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Clinical Areas of Interest</h2>
          </div>
          <div className="grid grid-3">
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>Pediatric Dysmorphology & Syndromes</h4>
            </div>
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>Pre-conception Carrier Risks</h4>
            </div>
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>Cardiovascular Genetics</h4>
            </div>
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>Hereditary Cancers Profiling</h4>
            </div>
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>NIPT Prenatal Screening Logistics</h4>
            </div>
            <div className="card text-center" style={{ padding: '20px' }}>
              <CheckCircle size={18} className="text-accent text-center-icon mb-2" />
              <h4>Variant Curation & VUS Reclassifications</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Placeholder */}
      <section className="section" id="publications">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent">Research Ledgers</span>
            <h2>Publications & Academic Submissions</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Selected papers authored by Dr. Lahiru Prabodha and research teams.
            </p>
          </div>
          <div className="publications-list">
            <div className="card mb-4" style={{ padding: '20px' }}>
              <strong>"Spectra of Chromosomal Microarray Variants in Developmental Anomalies"</strong>
              <p className="small-text mt-1">Co-authored in human genomics sessions.</p>
            </div>
            <div className="card mb-4" style={{ padding: '20px' }}>
              <strong>"Carrier Rates for Hereditary Hemoglobinopathies in Southern Province, Sri Lanka"</strong>
              <p className="small-text mt-1">Reviewing regional Thalassemia screenings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Talks and Public awareness */}
      <section className="section section-light">
        <div className="container grid grid-2">
          <div>
            <h2>Talks, Media & Public Awareness</h2>
            <p className="mt-4">
              Dr. Lahiru Prabodha is committed to raising public awareness of genetics to counter common misconceptions regarding hereditary diseases. He frequently speaks at local medical societies, conducts public lectures, and publishes ethical articles explaining Thalassemia risks and carrier screening protocols.
            </p>
          </div>
          <div className="flex-col justify-center gap-4">
            <div className="card card-glass flex-row-center gap-3">
              <Presentation size={20} className="text-gold" />
              <div>
                <h4>National Health TV Lectures</h4>
                <p className="small-text">Explaining prenatal screening options.</p>
              </div>
            </div>
            <div className="card card-glass flex-row-center gap-3">
              <BookOpen size={20} className="text-accent" />
              <div>
                <h4>General Medical Ethics Writing</h4>
                <p className="small-text">Demystifying Direct-to-Consumer DNA testing kits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark text-center">
        <div className="container">
          <h2>Request a Clinical Genetics Consultation</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '12px auto 32px' }}>
            Book a face-to-face evaluation in Galle or an online tele-health video session.
          </p>
          <Link to="/appointments" className="btn btn-gold btn-lg">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
