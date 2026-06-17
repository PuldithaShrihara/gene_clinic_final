import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneCall, HelpCircle, FileSearch, CheckSquare, HeartHandshake } from 'lucide-react';

export default function Journey() {
  const steps = [
    {
      step: '1',
      title: 'Initial Inquiry',
      subtitle: 'Connecting with the Clinic',
      icon: PhoneCall,
      desc: 'Patient contacts the clinic through phone, WhatsApp, email, or appointment form. Support clarifies details, pricing, and locations.',
      note: 'Tip: You can use our header Upload Report button to send third-party reports prior to your call.'
    },
    {
      step: '2',
      title: 'Consultation',
      subtitle: 'In-Depth Evaluation',
      icon: HelpCircle,
      desc: 'Doctor reviews medical history, family pedigree tree, symptoms, concerns, previous reports, and clinical goals.',
      note: 'Duration: Typically takes 45 to 60 minutes for a comprehensive review.'
    },
    {
      step: '3',
      title: 'Test Selection',
      subtitle: 'Personalized Planning',
      icon: FileSearch,
      desc: 'Doctor guides whether genetic testing, report review, clinical panel, wellness genomics, NIPT, sequencing, or referral is suitable.',
      note: 'We prevent unnecessary costs by advising only clinically relevant panels.'
    },
    {
      step: '4',
      title: 'Sample Collection & Testing',
      subtitle: 'Molecular Logistics',
      icon: CheckSquare,
      desc: 'Sample is collected according to test requirement such as blood, saliva, stool, skin scraping, tissue, FFPE block, embryo biopsy, or other accepted sample type.',
      note: 'Samples are dispatched to leading accredited local and international sequencing partners.'
    },
    {
      step: '5',
      title: 'Result Interpretation & Follow-up',
      subtitle: 'Collaborative Care Path',
      icon: HeartHandshake,
      desc: 'Doctor explains results, implications, family risk, wellness guidance, further investigations, or referral pathway.',
      note: 'We coordinate findings directly with your primary specialists to ensure clinical action.'
    }
  ];

  return (
    <div className="journey-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">Patient Path</span>
          <h1 className="text-gradient">Your Patient Journey</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            A structured, medically responsible pathway guiding you from initial inquiry to long-term follow-up care.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-light">
        <div className="container">
          <div className="timeline">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="timeline-item">
                  <div className="timeline-badge">
                    {step.step}
                  </div>
                  <div className="timeline-content">
                    <div className="flex-row-center gap-3 mb-2">
                      <Icon className="text-accent" size={20} />
                      <h3 style={{ fontSize: '1.35rem' }}>{step.title}</h3>
                    </div>
                    <span className="badge badge-accent mb-4" style={{ fontSize: '0.75rem' }}>{step.subtitle}</span>
                    <p>{step.desc}</p>
                    <div className="timeline-note mt-4 pt-3 border-top">
                      <p className="small-text text-muted"><em>{step.note}</em></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
