import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Dna, ClipboardList, BookOpen, 
  ChevronRight, Calendar, User, Microscope, 
  MapPin, CheckCircle, Activity, HeartHandshake, ArrowRight, FileUp, Sparkles, Award, Phone, Check, MessageCircle
} from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 3)))
      .catch(err => console.log('Failed to fetch articles:', err));
  }, []);

  const serviceCategories = [
    { title: 'Clinical Genetics', desc: 'Expert clinical diagnostics and phenotype mapping for rare or inherited syndromes.', icon: Activity, path: '/services' },
    { title: 'Genetic Counselling', desc: 'Pre- and post-test ethical support clarifying inheritance patterns and family risks.', icon: HeartHandshake, path: '/services', highlighted: true }, // Highlighted card
    { title: 'Wellness Genomics', desc: 'Personalized wellness profiles matching food, weight, and fitness responses in your DNA.', icon: Sparkles, path: '/blueprint' },
    { title: 'NIPT / Prenatal Screening', desc: 'Safe maternal cfDNA screening for major fetal trisomies (21, 18, 13) after 10 weeks.', icon: ClipboardList, path: '/nipt' },
    { title: 'Genetic Report Interpretation', desc: 'Professional re-evaluation of third-party clinical DNA panel or exome reports.', icon: BookOpen, path: '/services' },
    { title: 'Sequencing & Panels', desc: 'Coordination of Exomes, Whole Genomes, and targeted clinical gene panels.', icon: Microscope, path: '/services' }
  ];

  const benefits = [
    { title: 'Clinical Geneticist-led care', desc: 'Evaluations directed by a qualified clinical genetics physician.' },
    { title: 'Genetic counselling support', desc: 'Continuous compassionate support mapping hereditary concerns.' },
    { title: 'Secure report review', desc: 'Confidential line-by-line review of DNA and exome panels.' },
    { title: 'Personalized wellness insights', desc: 'Translating DNA sequence traits into actionable nutrition paths.' },
    { title: 'NIPT and prenatal guidance', desc: 'Responsible screening prenatal options protecting parent decision routes.' },
    { title: 'Academic & laboratory background', desc: 'Evidence-based decisions led by Ruhuna Faculty lab head.' }
  ];

  return (
    <div className="home-page">
      {/* Background Ornaments */}
      <div className="bg-wave-lines"></div>
      <div className="ornament-circle" style={{ width: '450px', height: '450px', top: '-150px', right: '-150px' }}></div>
      <div className="ornament-circle" style={{ width: '300px', height: '300px', bottom: '25%', left: '-120px' }}></div>

      {/* Hero Section */}
      <section className="section hero-section animate-fade-in" style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge badge-accent mb-4">Clinical Genetics & Wellness Genomics</span>
            <h1 className="text-gradient">Personalized Genetic Care for Better Health Decisions</h1>
            <p className="hero-subheadline">
              Specialist clinical genetics, genetic counselling, NIPT, wellness genomics, sequencing, and genetic report interpretation led by Dr. Lahiru Prabodha.
            </p>
            <div className="hero-actions">
              <Link to="/appointments" className="btn btn-primary">
                Book Appointment <Calendar size={18} />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right Visual Area: Premium Doctor Credentials Card */}
          <div className="hero-visual">
            <div className="hero-visual-wrapper">
              {/* Soft blue background shape glow */}
              <div className="hero-bg-glow"></div>
              
              {/* Doctor Card */}
              <div className="hero-doctor-card">
                <div className="doctor-card-badge">CLINICAL GENETICIST</div>
                <div className="doctor-avatar-placeholder">
                  <Dna size={40} className="logo-icon animate-pulse" />
                </div>
                <div className="doctor-info">
                  <h3>Dr. L. B. Lahiru Prabodha</h3>
                  <div className="doctor-degrees">MBBS, MPhil, MSc Clinical Genetics</div>
                  <div className="doctor-title">Clinical Geneticist & Genetic Counsellor</div>
                  <div className="doctor-meta">
                    <span>Senior Lecturer</span>
                    <span className="meta-separator">|</span>
                    <span>Molecular Genetics Laboratory Lead</span>
                  </div>
                </div>
              </div>
              
              {/* 4 Aligned Floating Cards */}
              <div className="floating-card fc-1">
                <HeartHandshake size={16} />
                <span>Genetic Counselling</span>
              </div>
              <div className="floating-card fc-2">
                <ClipboardList size={16} />
                <span>NIPT Guidance</span>
              </div>
              <div className="floating-card fc-3">
                <Activity size={16} />
                <span>Wellness Genomics</span>
              </div>
              <div className="floating-card fc-4">
                <BookOpen size={16} />
                <span>Report Interpretation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip below Hero */}
      <section className="trust-strip-section">
        <div className="container">
          <div className="trust-strip-wrapper">
            <div className="trust-item">
              <ShieldCheck size={18} />
              <span>Clinical Geneticist-led Care</span>
            </div>
            <div className="trust-item">
              <HeartHandshake size={18} />
              <span>Genetic Counselling Support</span>
            </div>
            <div className="trust-item">
              <ClipboardList size={18} />
              <span>NIPT & Prenatal Guidance</span>
            </div>
            <div className="trust-item">
              <Activity size={18} />
              <span>Wellness Genomics</span>
            </div>
            <div className="trust-item">
              <Award size={18} />
              <span>Academic & Laboratory Expertise</span>
            </div>
          </div>
        </div>
      </section>

      {/* Genetics Ticker Tape Banner */}
      <section className="ticker-tape-container">
        <div className="ticker-tape-scroll">
          <span>🧬 Clinical Genetics &bull; Galle</span>
          <span>🧬 Genetic Counselling &bull; GenSek</span>
          <span>🧬 Wellness Genomics &bull; Me360</span>
          <span>🧬 NIPT Prenatal Screening &bull; NIFTY</span>
          <span>🧬 Whole Exome Sequencing &bull; WES</span>
          <span>🧬 Genetic Report Interpretation</span>
          {/* Repeating for loop length */}
          <span>🧬 Clinical Genetics &bull; Galle</span>
          <span>🧬 Genetic Counselling &bull; GenSek</span>
          <span>🧬 Wellness Genomics &bull; Me360</span>
          <span>🧬 NIPT Prenatal Screening &bull; NIFTY</span>
        </div>
      </section>

      {/* Services Section (Redesigned with top banners & overlapping icons) */}
      <section className="section section-light" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2">Our Services</span>
            <h2>Our Genetic & Wellness Services</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Specialist guidance for individuals, families, couples, and patients seeking clear genetic health decisions.
            </p>
          </div>

          <div className="grid grid-3">
            {serviceCategories.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx} 
                  className={`card flex-col-card hover-scale ${service.highlighted ? 'card-highlighted' : ''}`}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Styled Header block */}
                  <div className="service-card-header">
                    <div className="service-card-icon-overlap">
                      <Icon size={24} className="text-secondary" style={{ color: 'var(--secondary)' }} />
                    </div>
                  </div>

                  <h3 className="mt-2" style={{ fontSize: '1.35rem' }}>{service.title}</h3>
                  <p className="mt-3 small-text">{service.desc}</p>
                  
                  <Link to={service.path} className="btn-link mt-auto pt-6 inline-flex align-center gap-1">
                    Learn More <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section (Redesigned with overlapping image blocks) */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container grid grid-2 align-center" style={{ gap: '48px' }}>
          
          {/* Left Side: Overlapping visual blocks */}
          <div className="why-choose-visual">
            <div className="why-choose-overlap-wrapper">
              <div className="wc-card-2"></div>
              <div className="wc-card-1">
                <Microscope size={40} className="text-secondary mb-3 text-center-icon" />
                <h4>Evidence-Based Genomics</h4>
                <p className="xsmall-text text-muted mt-2">
                  All tests are performed by accredited molecular facilities and interpreted in strict alignment with ACMG guidelines.
                </p>
              </div>
              <div className="wc-card-3">
                <Check size={24} />
              </div>
            </div>
          </div>

          {/* Right Side: content */}
          <div>
            <span className="badge badge-gold mb-4">Why Choose The Gene Clinic</span>
            <h2>Trusted Clinical Genetics</h2>
            <p className="lead-text mt-4 mb-6">
              Specialist genetic consultation, academic expertise, responsible interpretation, and personalized guidance in one trusted clinical pathway.
            </p>
            
            <div className="flex-col gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex-row gap-3 align-start">
                  <CheckCircle size={18} className="text-secondary flex-shrink-0" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{benefit.title}</strong>
                    <p className="xsmall-text text-muted mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/about" className="btn btn-primary mt-8">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Patient Journey (Visual cards layout) */}
      <section className="section section-light" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2>Our Guided Clinical Pathway</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              A visually mapped 5-step journey designed to provide guidance and clarity.
            </p>
          </div>

          <div className="grid grid-5-cols journey-steps-preview">
            <div className="step-preview-item card" style={{ padding: '24px 16px' }}>
              <div className="step-num">1</div>
              <h4>Initial Inquiry</h4>
              <p>Inquire online or call Galle clinical center.</p>
            </div>
            <div className="step-preview-item card" style={{ padding: '24px 16px' }}>
              <div className="step-num">2</div>
              <h4>Consultation</h4>
              <p>Pedigree analysis & history evaluations.</p>
            </div>
            <div className="step-preview-item card" style={{ padding: '24px 16px' }}>
              <div className="step-num">3</div>
              <h4>Test Selection</h4>
              <p>Align candidate genes with tests.</p>
            </div>
            <div className="step-preview-item card" style={{ padding: '24px 16px' }}>
              <div className="step-num">4</div>
              <h4>Sample & Test</h4>
              <p>Blood, saliva, or tissue collection logs.</p>
            </div>
            <div className="step-preview-item card" style={{ padding: '24px 16px' }}>
              <div className="step-num">5</div>
              <h4>Interpretation</h4>
              <p>Post-test counselling & referrals pathway.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Video Series Section */}
      <section className="section section-light" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2">Educational Media</span>
            <h2>Gene Clinic Video Series</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Watch informative discussions on clinical genetics, family health history, and DNA tests led by Dr. Lahiru Prabodha.
            </p>
          </div>

          <div className="grid grid-2">
            <div className="video-card">
              <div className="video-embed-container">
                <iframe
                  src="https://www.youtube.com/embed/bJzx6cO_CZw"
                  title="Gene Clinic Programme Episode 01"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-info">
                <h4>Episode 01: Genetics & Human Behavior</h4>
                <p>
                  මිනිස්සු සිතන පතන හැමදෙයක්ම තීරණය කරන්නේ ජාන මගින් ද? An in-depth discussion on how genes impact human thoughts, actions, and behavioral genetics.
                </p>
              </div>
            </div>

            <div className="video-card">
              <div className="video-embed-container">
                <iframe
                  src="https://www.youtube.com/embed/aFFD9iSamjw"
                  title="Gene Clinic Programme Episode 02"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-info">
                <h4>Episode 02: Introduction to Genetic Counselling</h4>
                <p>
                  ජාන උපදේශනය සහ එහි වැදගත්කම. Understanding clinical genetics, pedigree evaluations, family inheritance risk mapping, and supportive counselling pathways.
                </p>
              </div>
            </div>

            <div className="video-card">
              <div className="video-embed-container">
                <iframe
                  src="https://www.youtube.com/embed/pvLvTrLkhWU"
                  title="Gene Clinic Programme Episode 03"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-info">
                <h4>Episode 03: Hereditary Diseases & DNA Screening</h4>
                <p>
                  පාරම්පරික රෝග සහ ඩී.එන්.ඒ. පරික්ෂාව. Learn how DNA panel screening identifies genetic predispositions for cardiac, oncological, and rare familial diseases.
                </p>
              </div>
            </div>

            <div className="video-card">
              <div className="video-embed-container">
                <iframe
                  src="https://www.youtube.com/embed/N3OH0ulxZqs"
                  title="Gene Clinic Programme Episode 04"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-info">
                <h4>Episode 04: Genomics for Wellness & Lifestyle</h4>
                <p>
                  නිරෝගී දිවියකට ජාන විද්‍යාව. Exploring how wellness genomics can translate your genetic variants into actionable guidance for nutrition, exercise, and metabolism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Packages Preview */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent">Diagnostics Packages</span>
            <h2>Genetic Test Packages</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              A selection of our popular clinical and lifestyle panels.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card flex-col-card package-card">
              <h3>Wellness & Lifestyle</h3>
              <p className="small-text mt-2">Custom nutritional responses, metabolics, and tolerances.</p>
              <div className="mt-4 border-top pt-4 xsmall-text">
                <span className="badge mb-2">Saliva</span>
                <div>Turnaround: 3 - 4 weeks</div>
              </div>
              <Link to="/packages" className="btn btn-secondary btn-sm mt-6 w-full text-center">Request Details</Link>
            </div>
            <div className="card flex-col-card card-gold package-card">
              <h3>Me360 Complete</h3>
              <p className="small-text mt-2">Our premier program linking weight, vitamins, fitness, and lipid tendencies.</p>
              <div className="mt-4 border-top pt-4 xsmall-text">
                <span className="badge mb-2">Saliva</span>
                <div>Turnaround: 4 - 5 weeks</div>
              </div>
              <Link to="/packages" className="btn btn-secondary btn-sm mt-6 w-full text-center">Request Details</Link>
            </div>
            <div className="card flex-col-card package-card">
              <h3>NIPT Prenatal</h3>
              <p className="small-text mt-2">A safe screening choice for fetal chromosomal aneuploidies from 10 weeks.</p>
              <div className="mt-4 border-top pt-4 xsmall-text">
                <span className="badge mb-2">Whole Blood (Streck)</span>
                <div>Turnaround: 10 - 14 days</div>
              </div>
              <Link to="/packages" className="btn btn-secondary btn-sm mt-6 w-full text-center">Request Details</Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/packages" className="btn-link">View All Test Packages &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Wellness Blueprint Dashboard Preview */}
      <section className="section section-light" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container grid grid-2 align-center" style={{ gap: '48px' }}>
          <div className="card card-glass">
            <h3>Visual Genetic Predispositions</h3>
            <div className="mt-6 flex-col gap-3">
              <div className="flex-row-between p-2 rounded-md bg-secondary border">
                <span>Nutrition & Satiety Response</span>
                <span className="badge badge-accent">Green Zone (Good)</span>
              </div>
              <div className="flex-row-between p-2 rounded-md bg-secondary border">
                <span>Detoxification Efficiency</span>
                <span className="badge badge-gold">Amber Zone (Average)</span>
              </div>
              <div className="flex-row-between p-2 rounded-md bg-secondary border">
                <span>Dementia Risk Profile</span>
                <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>Red Zone (Risk)</span>
              </div>
            </div>
          </div>
          <div>
            <span className="badge badge-gold mb-4">Me360 Profiler</span>
            <h2>Your DNA Speaks. We Help You Understand It.</h2>
            <p className="mt-4">
              Our Wellness Blueprint maps out nutrition, fitness, weight, detoxification profile, food sensitivities, health predispositions, and dementia risk variables.
            </p>
            <p className="xsmall-text text-muted mt-4">
              <strong>Medical Disclaimer:</strong> Genetic insights are not a diagnosis and should be interpreted alongside clinical examinations by a qualified healthcare professional.
            </p>
            <Link to="/blueprint" className="btn btn-primary mt-6">
              View Blueprint Details
            </Link>
          </div>
        </div>
      </section>

      {/* NIPT Section */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container grid grid-2 align-center" style={{ gap: '48px' }}>
          <div>
            <span className="badge badge-accent mb-4">Prenatal Care</span>
            <h2>NIPT & Prenatal Genetic Screening Guidance</h2>
            <p className="mt-4">
              Non-invasive prenatal screening (NIPT) allows safe, early screening for chromosomal aneuploidies like trisomies 21, 18, and 13 from around 10 weeks of pregnancy. 
            </p>
            <p className="small-text text-muted mt-2">
              NIPT is a screening test, not a diagnostic test. High-risk results should be verified via confirmatory diagnostic testing coordinated with your clinician.
            </p>
            <div className="mt-6 flex-row-center gap-4">
              <Link to="/appointments?type=NIPT%20consultation" className="btn btn-primary">
                Book NIPT Consultation
              </Link>
              <Link to="/nipt" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="card card-glass text-center">
            <h3>Trisomy Screening</h3>
            <div className="mt-4 flex-col gap-2 align-center">
              <div className="badge badge-accent py-2 w-full justify-center">Down Syndrome (Trisomy 21) Screen</div>
              <div className="badge badge-accent py-2 w-full justify-center">Edwards Syndrome (Trisomy 18) Screen</div>
              <div className="badge badge-accent py-2 w-full justify-center">Patau Syndrome (Trisomy 13) Screen</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
