import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldAlert, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WellnessBlueprint() {
  const sections = [
    { title: '1. Know Thyself Baseline', desc: 'Understanding your baseline genomic parameters to structure targeted lifestyle and prevention choices.' },
    { title: '2. Nutrient Profile (Micronutrients)', desc: 'Mapping metabolic efficiency markers for vitamins (e.g. Folate activation via MTHFR) and essential minerals.' },
    { title: '3. Macro Nutrient Response', desc: 'Genetic responses to dietary saturated fats, carbohydrate sensitivities, and lipid metabolic balances.' },
    { title: '4. Food Sensitivity', desc: 'Genetics-based indicators for lactose tolerance, celiac gluten sensitivity, and caffeine processing speeds.' },
    { title: '5. Weight Management', desc: 'Reviewing fat storage tendencies, energy expenditure genes, and appetite regulations (FTO and MC4R pathway markers).' },
    { title: '6. Eating Behaviour Tendencies', desc: 'Evaluating genetic factors linked to sweet cravings, snacking tendencies, and satiety feedback loops.' },
    { title: '7. Genetic Lipid Profile', desc: 'Assessing inherited baselines for LDL, HDL, and triglyceride metabolism parameters.' },
    { title: '8. Fitness Profile', desc: 'ACTN3 gene assessments mapping power vs. endurance muscle ratios and cardio efficacy.' },
    { title: '9. Injury & Joint Recovery Response', desc: 'Evaluating collagen synthesis markers affecting tendon strength, joint recovery, and muscle soreness.' },
    { title: '10. Detoxification Profile', desc: 'Mapping hepatic enzyme activity (GST gene families) linked to cellular antioxidant and detox responses.' },
    { title: '11. Chemical & Additive Sensitivities', desc: 'Investigating genetic sensitivities related to dopamine pathways, reward responses, and chemical tolerances.' },
    { title: '12. Health Predisposition', desc: 'General educational predisposition scores for metabolic syndrome and long-term health curves.' },
    { title: '13. Dementia Risk Awareness', desc: 'Evaluating APOE gene parameters to map genetic associations for late-onset neurological indicators.' }
  ];

  return (
    <div className="blueprint-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Header Banner */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Me360 Complete Profile</span>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
            Me360 Wellness Blueprint
          </h1>
          <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>
            Personalized wellness insights based on genomic indicators, lifestyle parameters, and professional medical interpretations.
          </p>
        </div>
      </section>

      {/* Concept Description */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'start' }}>
            
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '20px' }}>What is the Wellness Blueprint?</h2>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '20px' }}>
                The <strong>Me360 Wellness Blueprint</strong> combines molecular genomics sequencing datasets with your physiological lifestyle history to generate a comprehensive guidance document. Rather than diagnosing conditions, this profile serves as an educational guide to support nutritional choices and fitness targets.
              </p>
              <p className="small-text text-muted" style={{ lineHeight: '1.7', marginBottom: '24px' }}>
                By identifying minor variations in metabolic, detoxification, and lipid pathways, we assist you and your nutritionist in tailoring dietary intakes, selecting optimal physical training regimens, and planning proactive health strategies.
              </p>
              
              {/* Mandatory Medical Disclaimer */}
              <div className="card card-glass" style={{ padding: '24px', borderLeft: '4px solid var(--accent)', background: 'rgba(15, 118, 110, 0.03)' }}>
                <div className="flex-row align-center gap-2 mb-2 text-accent" style={{ display: 'flex', alignItems: 'center' }}>
                  <ShieldAlert size={18} />
                  <strong style={{ fontSize: '0.9rem', fontWeight: 700 }}>Medical Liability Disclaimer</strong>
                </div>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                  The Me360 Wellness Blueprint genomics screening and lifestyle reports are provided solely for educational guidance and wellness awareness. They are not diagnostic tests, do not represent clinical diagnoses of disease, and do not guarantee prevention or clinical treatment outcomes. All genetic variants should be reviewed alongside clinical examinations in consultation with a qualified medical professional.
                </p>
              </div>
            </div>

            {/* Visual Interpretation explanation */}
            <div className="card" style={{ padding: '36px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'var(--secondary)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>The G/A/R Interpretation Zones</h3>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '24px' }}>
                Raw genotype variants are translated into three distinct color-coded predisposition categories:
              </p>

              <div className="flex-col gap-4">
                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="zone-indicator-badge green-zone flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>G</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Green Zone: Good (Optimal Response)</strong>
                    <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', marginTop: '4px', margin: 0 }}>
                      No elevated genetic risk detected for this module. Standard physiological response and normal metabolism.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="zone-indicator-badge amber-zone flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>A</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Amber Zone: Average (Moderate Tendency)</strong>
                    <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', marginTop: '4px', margin: 0 }}>
                      Altered genetic response or moderate risk predisposition. Suggests lifestyle adjustments may be supportive.
                    </p>
                  </div>
                </div>

                <div className="flex-row gap-3 align-start" style={{ display: 'flex' }}>
                  <div className="zone-indicator-badge red-zone flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>R</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Red Zone: Risk (Elevated Sensitivity)</strong>
                    <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', marginTop: '4px', margin: 0 }}>
                      Elevated genetic predisposition or high sensitivity response. Targeted lifestyle interventions and close clinical guidance are recommended.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13 Blueprint Categories */}
      <section className="section" style={{ padding: '60px 0 80px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2">Modules Covered</span>
            <h2>The 13 Me360 Coverage Modules Mapped</h2>
            <p className="small-text text-muted" style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              The Me360 report structures genetic analysis into clear, actionable health and wellness categories:
            </p>
          </div>
          
          <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {sections.map((sec, idx) => (
              <div key={idx} className="card card-glass hover-scale flex-col-card" style={{ padding: '24px' }}>
                <div className="flex-row align-center gap-2 mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                  <Sparkles size={16} className="text-accent" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{sec.title}</h4>
                </div>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.5', margin: 0 }}>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section section-light text-center" style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2>Assess Your Wellness Predispositions</h2>
          <p className="small-text text-muted mt-4 mb-8" style={{ lineHeight: '1.6' }}>
            Ready to explore your metabolic and nutritional guidelines? Book a pre-test consultation to discuss Me360 sequencing options with our genetics coordinators.
          </p>
          <div className="flex-row-center justify-center gap-4 flex-wrap" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/appointments?type=Wellness%20genomics%20consultation" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Book Wellness Session
            </Link>
            <Link to="/packages?category=Wellness%20%26%20Lifestyle%20Packages" className="btn btn-secondary" style={{ padding: '12px 28px' }}>
              View Wellness Packages
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
