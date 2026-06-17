import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WellnessBlueprint() {
  const sections = [
    { title: 'Know Thyself', desc: 'Understanding your baseline genomic parameters to structure targeted lifestyle interventions.' },
    { title: 'Micro Nutrient Needs', desc: 'Mapping metabolic efficiency markers for vitamins (e.g. Folate activation via MTHFR) and essential minerals.' },
    { title: 'Macro Nutrient Response', desc: 'Genetic responses to dietary saturated fats, carbohydrate sensitivities, and lipid metabolic balances.' },
    { title: 'Food Sensitivity & Tolerance', desc: 'Genetics-based indicators for lactose tolerance, celiac gluten sensitivity, and caffeine processing speeds.' },
    { title: 'Weight Management', desc: 'Reviewing fat storage tendencies and appetite regulations (FTO and MC4R pathway markers).' },
    { title: 'Eating Behaviour', desc: 'Evaluating genetic factors linked to sweet cravings, snacking tendencies, and satiety feedback loops.' },
    { title: 'Genetic Lipid Profile', desc: 'Assessing inherited baselines for LDL, HDL, and triglyceride metabolism parameters.' },
    { title: 'Fitness & Response to Exercise', desc: 'ACTN3 gene assessments mapping power vs. endurance muscle ratios and cardio efficacy.' },
    { title: 'Injury & Recovery', desc: 'Evaluating collagen synthesis markers affecting tendon strength, joint recovery, and muscle soreness.' },
    { title: 'Detoxification Profile', desc: 'Mapping hepatic enzyme activity (GST gene families) linked to cellular antioxidant responses.' },
    { title: 'Drug / Addiction Tendency', desc: 'Investigating genetic sensitivities related to dopamine pathways and reward responses.' },
    { title: 'Health Predisposition', desc: 'General educational predisposition scores for metabolic syndrome and long-term health curves.' },
    { title: 'Dementia Risk', desc: 'Evaluating APOE gene parameters to map genetic associations for late-onset neurological indicators.' }
  ];

  return (
    <div className="blueprint-page animate-fade-in">
      {/* Header Banner */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Me360 Complete Profile</span>
          <h1 className="text-gradient">Your DNA Speaks. We Help You Understand It.</h1>
          <p className="lead-text mt-4">
            Personalized wellness insights based on genetic information, lifestyle data, and professional interpretation.
          </p>
        </div>
      </section>

      {/* Concept Description */}
      <section className="section section-light">
        <div className="container grid grid-2">
          <div>
            <h2>What is the Wellness Blueprint?</h2>
            <p className="mt-4">
              My Wellness Blueprint combines molecular DNA sequencing data with your lifestyle history to build an educational guide for daily health choices. 
            </p>
            <p className="mt-4">
              By evaluating variations in metabolic pathways, we help you and your nutritionist customize dietary intakes, select suitable workout routines, and establish proactive health goals.
            </p>
            <div className="card card-glass mt-6 border-top pt-4">
              <div className="flex-row-center gap-2 mb-2 text-gold">
                <Info size={16} />
                <strong>Medically Responsible Wording:</strong>
              </div>
              <p className="xsmall-text text-muted">
                Wellness genomics reports reflect general <em>genetic tendencies</em> or <em>altered responses</em> and are not diagnostic tools. They cannot diagnose, prevent, cure, or treat conditions, nor do they guarantee clinical disease outcomes. All genetic reports should be discussed with a qualified healthcare professional.
              </p>
            </div>
          </div>

          {/* Visual Interpretation explanation */}
          <div className="card card-accent flex-col justify-center">
            <h3>Visual Interpretation System</h3>
            <p className="mt-2 small-text text-muted mb-6">
              We translate raw genome variants into three simple clinical predisposition zones:
            </p>

            <div className="flex-col gap-4">
              <div className="flex-row gap-3 align-start">
                <div className="zone-indicator-badge green-zone flex-shrink-0">G</div>
                <div>
                  <strong>Green Zone: Good / Optimal Response</strong>
                  <p className="xsmall-text text-muted mt-1">
                    No elevated genetic risk detected. Standard physiological response and normal metabolism.
                  </p>
                </div>
              </div>

              <div className="flex-row gap-3 align-start">
                <div className="zone-indicator-badge amber-zone flex-shrink-0">A</div>
                <div>
                  <strong>Amber Zone: Average / Moderate Tendency</strong>
                  <p className="xsmall-text text-muted mt-1">
                    Altered genetic response or moderate risk predisposition. Suggests lifestyle adjustments may be helpful.
                  </p>
                </div>
              </div>

              <div className="flex-row gap-3 align-start">
                <div className="zone-indicator-badge red-zone flex-shrink-0">R</div>
                <div>
                  <strong>Red Zone: Elevated Sensitivity / Risk Response</strong>
                  <p className="xsmall-text text-muted mt-1">
                    Elevated genetic predisposition or high sensitivity. Indicates customized adjustments are highly recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13 Blueprint Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>The 13 Categories Mapped</h2>
            <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Our Wellness Blueprint structures reports into clear, distinct molecular focus areas.
            </p>
          </div>
          <div className="grid grid-3">
            {sections.map((sec, idx) => (
              <div key={idx} className="card card-glass hover-scale flex-col-card">
                <div className="flex-row-center gap-2 mb-3">
                  <Sparkles size={16} className="text-accent" />
                  <h4 style={{ fontSize: '1.15rem' }}>{sec.title}</h4>
                </div>
                <p className="xsmall-text text-muted mt-auto">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section section-light text-center">
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2>Unlock Your Personalized Wellness Blueprint</h2>
          <p className="mt-4 mb-8">
            Schedule a Wellness Genomics Consultation to coordinate sample collection and map out your genetic tendencies.
          </p>
          <div className="flex-row-center justify-center gap-4 flex-wrap">
            <Link to="/appointments?type=Wellness%20genomics%20consultation" className="btn btn-primary">
              Book Wellness Session
            </Link>
            <Link to="/packages?category=Wellness%20%26%20Lifestyle%20Packages" className="btn btn-secondary">
              View Wellness Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
