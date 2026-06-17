import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Users, FileText, CheckCircle2, Sparkles, 
  HeartHandshake, ShieldAlert, ClipboardList, Dna, 
  HelpCircle, Microscope, Layers
} from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      title: 'Clinical Genetics Consultation',
      icon: Activity,
      desc: 'Comprehensive clinical evaluation and diagnostic guidance for individuals and families with suspected or confirmed inherited conditions.',
      who: 'Patients presenting with unexplained metabolic, neurological, or physical features suggesting a rare genetic syndrome.',
      expect: 'Detailed review of clinical records, medical history, construction of a three-generation pedigree chart, and candidate gene identification.'
    },
    {
      title: 'Genetic Counselling',
      icon: HeartHandshake,
      desc: 'Compassionate, ethical support to help patients and families understand genetic inheritance, testing choices, result meanings, and psychological implications.',
      who: 'Couples planning family, individuals with positive test results, or families managing hereditary disorders.',
      expect: 'Structured sessions discussing risk probabilities, ethical choices, testing expectations, and family communication support.'
    },
    {
      title: 'Genetic Testing Guidance',
      icon: FileText,
      desc: 'Expert support in selecting the most cost-effective, high-diagnostic-yield DNA tests and navigating sequencing alternatives.',
      who: 'Patients advised to undergo testing but unsure about laboratory methods, diagnostic panels, or cost structures.',
      expect: 'Case analysis matching your features with targeted gene panels or genomic sequencing options to prevent unnecessary costs.'
    },
    {
      title: 'Genetic Report Interpretation',
      icon: CheckCircle2,
      desc: 'Detailed clinical explanation of third-party or direct-to-consumer genetic test reports, including VUS classifications.',
      who: 'Individuals with reports containing ambiguous genetic variant statements (Variants of Uncertain Significance).',
      expect: 'Variant database check, correlation with current clinical literature, symptom review, and detailed explanation of variant relevance.'
    },
    {
      title: 'Wellness Genomics',
      icon: Sparkles,
      desc: 'Personalized genomic profiling related to nutrition, fitness, metabolic responses, detoxification, and long-term wellness planning.',
      who: 'Healthy individuals wishing to customize lifestyle choices based on genetic predispositions.',
      expect: 'Actionable wellness blueprint outlining metabolic rates, food tolerances, fitness responses, and lifestyle guidance checklists.'
    },
    {
      title: 'Reproductive Genetics',
      icon: Users,
      desc: 'Conception and pre-conception mapping, carrier screening, and risk counseling for couples planning families.',
      who: 'Couples with family histories of Thalassemia, recurrent losses, or consanguineous marriages.',
      expect: 'Pedigree risk evaluation, carrier screen recommendations, and pre-conception path guidance.'
    },
    {
      title: 'NIPT / Prenatal Screening',
      icon: ClipboardList,
      desc: 'Clinical screening for major chromosomal aneuploidies (trisomies 21, 18, 13) from cell-free DNA in maternal blood.',
      who: 'Expectant mothers from 10 weeks of pregnancy wishing to screen fetal chromosomal risks non-invasively.',
      expect: 'Streck sample collection instructions, prenatal screening risk assessment, and counseling on screening vs. diagnosis.'
    },
    {
      title: 'Clinical Panels',
      icon: ShieldAlert,
      desc: 'Targeted Next-Generation Sequencing (NGS) panels focusing on specific disease areas (e.g. cardiac, cancer, neurological).',
      who: 'Individuals with strong clinical features or family histories of early-onset cardiac disorders or cancers.',
      expect: 'Selection of specific gene panels (BRCA1/2, cardiomyopathy panels) and coordination of sample testing.'
    },
    {
      title: 'Whole Exome Sequencing',
      icon: Dna,
      desc: 'High-depth sequencing of all protein-coding regions (~22,000 genes) to diagnose complex, unsolved clinical cases.',
      who: 'Patients with developmental delays, rare pediatric syndromes, or complex unexplained clinical signs.',
      expect: 'Informed consent checklist, sequencing coordination, variant bioinformatics check, and clinical report signed by specialist.'
    },
    {
      title: 'Whole Genome Sequencing',
      icon: Microscope,
      desc: 'Comprehensive analysis of the entire coding and non-coding sequence of DNA, available on request for complex indications.',
      who: 'Cases where exome sequencing or specific panels are inconclusive and require deep structural variant mapping.',
      expect: 'Complete genomic library curation, deep variant diagnostics, and detailed consultation reviews.'
    },
    {
      title: 'Liquid Biopsy / Somatic Testing',
      icon: Layers,
      desc: 'Cancer-related somatic tumor profiling and cell-free circulating tumor DNA analysis, available on request.',
      who: 'Oncology patients seeking genetic markers in tumor tissue or blood for targeted treatment options.',
      expect: 'Referral review, coordination with specialized oncology testing labs, and somatic variant report reviews.'
    },
    {
      title: 'Microbiome and Epigenetics',
      icon: HelpCircle,
      desc: 'Advanced testing pathways mapping gut microflora composition, skin microbiomes, and epigenetic biological age markers, available on request.',
      who: 'Proactive wellness clients managing gut health, metabolism issues, or interested in epigenetic health indices.',
      expect: 'Stool/swab sample coordination, bacterial diversity indexes mapping, and dietary adjustments recommendations.'
    }
  ];

  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">GenSek Health Clinical Programs</span>
          <h1 className="text-gradient">Clinical Genetics & Wellness Genomics Services</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            We provide structured, medically responsible consultations. Select a service to read detailed profiles, expectations, and request details.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-2">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="card card-accent hover-scale flex-col-card">
                  <div className="service-header flex-row-center gap-4 mb-4">
                    <div className="card-icon-container">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 style={{ fontSize: '1.35rem' }}>{service.title}</h3>
                  </div>

                  <p className="mb-4">{service.desc}</p>

                  <div className="service-details border-top pt-4 mt-auto">
                    <div className="detail-row mb-3">
                      <strong>Who It Is For:</strong>
                      <p className="small-text text-muted">{service.who}</p>
                    </div>
                    <div className="detail-row mb-4">
                      <strong>What to Expect:</strong>
                      <p className="small-text text-muted">{service.expect}</p>
                    </div>
                  </div>

                  <Link 
                    to={`/appointments?type=${encodeURIComponent(service.title)}`} 
                    className="btn btn-primary w-full mt-4"
                  >
                    Book Consultation
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
