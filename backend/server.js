import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));


// Global settings
let config = {
  showPricing: true // Enabled by client request
};

// In-memory appointments database
let appointments = [
  {
    id: '1',
    name: 'Dilhan Perera',
    phone: '+94 77 123 4567',
    email: 'dilhan.perera@example.com',
    age: '34',
    appointmentType: 'Genetic report review',
    location: 'Galle Clinic',
    mode: 'In-person',
    reason: 'Review genetic testing results for cardiomyopathy',
    status: 'Confirmed',
    date: '2026-06-18',
    timeSlot: '09:00 AM',
    geneticReport: 'cardiomyopathy_panel.pdf',
    medicalReport: 'ecg_summary.pdf',
    consent: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Nadeesha Silva',
    phone: '+94 71 987 6543',
    email: 'nadeesha.s@example.com',
    age: '29',
    appointmentType: 'Reproductive genetics consultation',
    location: 'Colombo Clinic',
    mode: 'Online',
    reason: 'Pre-pregnancy genetic risk assessment',
    status: 'Pending',
    date: '2026-06-19',
    timeSlot: '11:30 AM',
    geneticReport: null,
    medicalReport: null,
    consent: true,
    createdAt: new Date().toISOString()
  }
];



// Test Packages Database (Annex 3)
let testPackages = [
  {
    id: 'pkg-1',
    code: 'GC/1',
    name: 'Nutrition',
    sampleType: 'Whole Blood/Saliva/BD',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Assess genetic factors related to nutrient metabolism, vitamin absorption, and dietary sensitivities.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-2',
    code: 'GC/2',
    name: 'Obesity',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genetic variants profile impacting fat storage, metabolic efficiency, appetite regulation, and satiety.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-3',
    code: 'GC/3',
    name: 'Fitness',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Analyze genetic markers linked to aerobic capacity, muscle fiber profile, and post-exercise recovery speed.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-4',
    code: 'GC/4',
    name: 'Detox',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genomic screen of Phase I and Phase II metabolic detoxification pathway efficiency.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-5',
    code: 'GC/5',
    name: 'Sports Fitness',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Advanced sports genetics evaluating tendon strength, oxygen utility, and recovery characteristics.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-6',
    code: 'GC/6',
    name: 'Ancestry',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Deep genetic lineage analysis tracing geographic roots, paternal/maternal haplogroups, and admixture.',
    tat: '3 - 6 weeks',
    price: 150000,
    status: 'Active'
  },
  {
    id: 'pkg-7',
    code: 'GC/7',
    name: 'Hair n Skin',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Assess hair thinning risk, skin elasticity, sun damage vulnerability, and collagen degradation patterns.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-8',
    code: 'GC/8',
    name: 'Me360 (complete package)',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Full-spectrum wellness blueprint mapping nutrition, fitness, obesity, detoxification, hair, skin, and metabolic traits.',
    tat: '3 - 6 weeks',
    price: 150000,
    status: 'Active'
  },
  {
    id: 'pkg-9',
    code: 'GC/9',
    name: 'Polycystic Ovary Syndrome',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genetic susceptibility screening for markers influencing PCOS risks, androgen pathways, and insulin dynamics.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-10',
    code: 'GC/10',
    name: 'Cardiac care',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genomic risk score mapping markers associated with cardiomyopathy, lipid levels, and coronary arterial risk.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-11',
    code: 'GC/11',
    name: 'Diabetes care',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Hereditary factors assessing risk profiles for glucose tolerance, insulin sensitivity, and Type 2 Diabetes.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-12',
    code: 'GC/12',
    name: 'Irritable bowel syndrome',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genomics of digestive mucosal barrier integrity, gut motility, and brain-gut pathway traits.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-13',
    code: 'GC/13',
    name: 'Autoimmune conditions',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genetic predisposition analysis for rheumatoid, celiac, thyroiditis, and systemic inflammatory pathways.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-14',
    code: 'GC/14',
    name: 'Geriatric care for dementia/Parkinson',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Assess ApoE profile alleles and other variants linked to familial neurodegenerative progression.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-15',
    code: 'GC/15',
    name: 'Menopause',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Genetic evaluation of bone mineral density decline risks, vasomotor response, and estrogen receptor traits.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-16',
    code: 'GC/16',
    name: 'ADHD',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Dopaminergic and noradrenergic genetic pathway variants associated with attention profile variations.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-17',
    code: 'GC/17',
    name: 'Cancer - Preliminary screening',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Wellness & Lifestyle Packages',
    explanation: 'Assess genetic markers across tumor suppressor genes to evaluate baseline hereditary cancer risks.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-18',
    code: 'GC/18',
    name: 'Epigenetics',
    sampleType: 'Saliva',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Epigenome profiling tracking DNA methylation, cellular age indicators, and environmental markers.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-19',
    code: 'GC/19',
    name: 'Gut microbiome',
    sampleType: 'Stool',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: '16S metagenomic sequencing of digestive microflora mapping diversity index, bacterial ratios, and metabolic indicators.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-20',
    code: 'GC/20',
    name: 'Skin microbiome',
    sampleType: 'Skin Scraping',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Epidermal microflora profiling cataloging bacterial and fungal diversity related to dermatological wellness.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-21',
    code: 'GC/21',
    name: 'Whole exome Sequencing',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'High-depth clinical sequencing of all 22,000 protein-coding exons to evaluate causative pathology.',
    tat: '3 - 6 weeks',
    price: 125000,
    status: 'Active'
  },
  {
    id: 'pkg-22',
    code: 'GC/22',
    name: 'Whole genome Sequencing',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Complete sequencing of non-coding, structural, and regulatory regions for full clinical evaluation.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-23',
    code: 'GC/23',
    name: 'Clinical Panels',
    sampleType: 'Whole Blood/Saliva/DB',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Targeted gene panels designed for specific medical conditions, including neurological, cardiac, and rare syndromes.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-24',
    code: 'GC/24',
    name: 'NIPT',
    sampleType: 'Whole Blood on a Streak Tube',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Safe, early maternal cfDNA screening for fetal chromosomal aneuploidies (trisomy 21, 18, 13).',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-25',
    code: 'GC/25',
    name: 'PGD',
    sampleType: 'Embryo Biopsy',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Pre-implantation Genetic Diagnosis screen for IVF embryos to evaluate health status before transfer.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-26',
    code: 'GC/26',
    name: 'Somatic/Tissue',
    sampleType: 'FFPE Block/Section',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Tumor biopsy profiling mapping mutations to guide targeted oncology therapeutics and precision oncology pathways.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  },
  {
    id: 'pkg-27',
    code: 'GC/27',
    name: 'Liquid Biopsy',
    sampleType: 'Whole Blood',
    category: 'Advanced Genomics & Clinical Packages',
    explanation: 'Non-invasive tracking of circulating tumor DNA (ctDNA) for tumor surveillance and early recurrence checks.',
    tat: '3 - 6 weeks',
    price: 'On request',
    status: 'Active'
  }
];
// Stats Endpoint
app.get('/api/stats', (req, res) => {
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  
  res.json({
    totalAppointments: appointments.length,
    pending: pendingCount,
    confirmed: confirmedCount,
    completed: completedCount,
    activePatientsCount: 212,
    testedCount: 178,
    wellnessConsultations: 89
  });
});

// Config Endpoint
app.get('/api/config', (req, res) => {
  res.json(config);
});

app.post('/api/config', (req, res) => {
  const { showPricing } = req.body;
  if (showPricing !== undefined) {
    config.showPricing = showPricing;
  }
  res.json(config);
});

// Appointments API
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  const { 
    name, phone, email, age, appointmentType, location, 
    mode, reason, date, timeSlot, geneticReport, medicalReport, consent 
  } = req.body;
  
  if (!name || !phone || !email || !age || !appointmentType || !location || !mode || !reason || consent === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAppt = {
    id: String(appointments.length + 1),
    name,
    phone,
    email,
    age,
    appointmentType,
    location,
    mode,
    reason,
    status: 'Pending',
    date: date || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || 'TBD',
    geneticReport: geneticReport || null,
    medicalReport: medicalReport || null,
    consent,
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppt);
  res.status(201).json(newAppt);
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appt = appointments.find(a => a.id === id);
  if (!appt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  if (status) {
    appt.status = status;
  }

  res.json(appt);
});

// Packages API
app.get('/api/packages', (req, res) => {
  // Return packages with pricing masked if showPricing is false
  if (!config.showPricing) {
    return res.json(testPackages.map(pkg => ({
      ...pkg,
      price: 'Available on request'
    })));
  }
  res.json(testPackages);
});

app.post('/api/packages', (req, res) => {
  const { name, sampleType, category, explanation, whoFor, deliverables, tat, price, status, remarks } = req.body;
  
  if (!name || !sampleType || !category || !explanation || !tat || price === undefined) {
    return res.status(400).json({ error: 'Missing package fields' });
  }

  const newPkg = {
    id: `pkg-${testPackages.length + 1}`,
    name,
    sampleType,
    category,
    explanation,
    whoFor: whoFor || '',
    deliverables: deliverables || '',
    tat,
    price: isNaN(Number(price)) ? price : Number(price),
    status: status || 'Active',
    remarks: remarks || ''
  };

  testPackages.push(newPkg);
  res.status(201).json(newPkg);
});

app.patch('/api/packages/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const pkg = testPackages.find(p => p.id === id);
  if (!pkg) {
    return res.status(404).json({ error: 'Package not found' });
  }

  Object.keys(fields).forEach(key => {
    if (key === 'price') {
      pkg[key] = isNaN(Number(fields[key])) ? fields[key] : Number(fields[key]);
    } else if (fields[key] !== undefined) {
      pkg[key] = fields[key];
    }
  });

  res.json(pkg);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
