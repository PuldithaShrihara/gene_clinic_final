import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Users, FileText, CheckCircle2, Sparkles, 
  HeartHandshake, ShieldAlert, ClipboardList, Dna, 
  HelpCircle, Microscope, Layers, Video
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
    },
    {
      title: 'Wellness Counselling',
      icon: HeartHandshake,
      desc: 'Medically guided lifestyle and preventive wellness counselling addressing genetic predisposition markers to optimize health outcomes.',
      who: 'Individuals seeking personalized guidance based on family health history and genetic screening indicators.',
      expect: 'Review of lifestyle predispositions, detailed analysis of risk factors, and development of personalized wellness goals.'
    },
    {
      title: 'Precision Medicine Guidance',
      icon: Dna,
      desc: 'Expert guidance on aligning therapeutic interventions and diagnostic strategies with individual genomic variations.',
      who: 'Patients looking to tailor their healthcare path in collaboration with their primary physicians and genetics advisors.',
      expect: 'Comprehensive variant review, clinical data alignment, and suggestions for individualized precision care pathways.'
    },
    {
      title: 'Personalized Management',
      icon: CheckCircle2,
      desc: 'Clinical coordination and planning support for genetic conditions, prioritizing safe, custom-tailored management strategies.',
      who: 'Individuals diagnosed with hereditary conditions or genetic predispositions requiring ongoing clinical supervision.',
      expect: 'Development of clinical tracking checklists, coordination with medical specialists, and regular follow-up consultations.'
    },
    {
      title: 'Nutrition & Wellness Guidance',
      icon: Sparkles,
      desc: 'DNA-informed dietary guidance and wellness support to optimize metabolic health, nutrient absorption, and fitness levels.',
      who: 'Wellness clients wanting to optimize nutrition based on genetic variations in nutrient absorption and food sensitivities.',
      expect: 'Analysis of dietary gene variants, custom nutrient guidelines, and structured lifestyle recommendations.'
    },
    {
      title: 'Cancer Prevention Awareness',
      icon: ShieldAlert,
      desc: 'Hereditary cancer risk counselling and early screening coordination, focused on raising clinical awareness and promoting proactive checks.',
      who: 'Individuals with a strong family history of early-onset oncological conditions or known hereditary cancer gene variants.',
      expect: 'Detailed pedigree mapping, hereditary risk evaluations, coordinate testing suggestions, and structured surveillance schedules.'
    },
    {
      title: 'Non-Communicable Disease Prevention Awareness',
      icon: Activity,
      desc: 'Preventive counselling and risk awareness support targeting chronic conditions like cardiovascular disease, diabetes, and metabolic syndromes.',
      who: 'Individuals wanting to proactively manage chronic disease risks based on hereditary risk profiles and clinical family histories.',
      expect: 'Inherited cardiac/metabolic risk reviews, lifestyle risk factor identification, and structured prevention guidelines.'
    },
    {
      title: 'Online Video Consultation',
      icon: Video,
      desc: 'Remote clinical counselling and report interpretation sessions, bringing specialist genetics support directly to your home.',
      who: 'Patients requiring pre-test or post-test consultations who are unable to travel to our Galle clinic center.',
      expect: 'Secure, confidential video consultation covering family history, test coordination, or variant report explanations.'
    }
  ];

  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">The Gene Clinic</span>
          <h1 className="text-gradient">Clinical Genetics & Wellness Genomics Services</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0', fontWeight: '500' }}>
            The Gene Clinic by GenSek Health Private Limited provides genetic counselling, wellness counselling, precision medicine guidance, and personalized management support under the guidance of Dr. L. B. Lahiru Prabodha.
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
