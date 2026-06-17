import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));


// Articles Data
const articles = [
  {
    id: '1',
    title: 'What Is Genetic Testing?',
    slug: 'what-is-genetic-testing',
    summary: 'An introductory guide to understanding clinical genetics, genetic tests, and how testing can help diagnose or manage inherited conditions.',
    content: 'Genetic testing involves analyzing DNA to identify changes (variants) in genes that may cause or increase the risk of a medical condition. In a clinical genetics setup, testing is typically recommended for individuals with a family history of an inherited disease, children with developmental delays or unique physical features, or couples planning a pregnancy who want to assess genetic compatibility. A clinical geneticist guides you through selecting the correct test, understanding what the results mean, and coordinating medical management or family screening options based on the findings.',
    category: 'Education',
    date: 'June 10, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Understanding Genetic Counselling',
    slug: 'understanding-genetic-counselling',
    summary: 'A look into genetic counseling, how it works, and why pre-test and post-test sessions are crucial for families.',
    content: 'Genetic counselling is the process of helping people understand and adapt to the medical, psychological, and familial implications of genetic contributions to disease. Sessions are conducted in a supportive and confidential environment. Pre-test counselling helps identify the best tests, clarify expectations, and discuss genetic inheritance. Post-test counselling covers the interpretation of results, including positive, negative, and variants of uncertain significance, mapping out family risk communications, medical referrals, and surveillance.',
    category: 'Counselling',
    date: 'June 11, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'What Is NIPT?',
    slug: 'what-is-nipt',
    summary: 'Learn about Non-Invasive Prenatal Testing, its accuracy, what it screens for, and its clinical limitations.',
    content: 'Non-Invasive Prenatal Testing (NIPT) analyzes cell-free fetal DNA circulating in maternal blood to screen for chromosomal conditions. From 10 weeks of pregnancy, NIPT offers highly sensitive screening for trisomy 21 (Down syndrome), trisomy 18 (Edwards syndrome), and trisomy 13 (Patau syndrome). Because it only requires a blood draw, it poses no risk to the fetus. However, it is a screening test rather than a diagnostic test. All high-risk outcomes must be confirmed via diagnostic procedures like amniocentesis or chorionic villus sampling (CVS).',
    category: 'Prenatal Screening',
    date: 'June 12, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Genetic Testing Before Pregnancy',
    slug: 'genetic-testing-before-pregnancy',
    summary: 'Why pre-conception carrier screening helps couples evaluate risks for conditions like Thalassemia.',
    content: 'Pre-pregnancy carrier screening helps couples assess whether they are carriers of mutations for recessive disorders like Thalassemia, Cystic Fibrosis, or Spinal Muscular Atrophy. Since carriers are healthy and display no symptoms, they are usually unaware of their status. If both parents carry a mutation in the same gene, there is a 25% risk of having an affected child. A pre-conception genetics consultation outlines carrier screening options and supports reproductive choices before pregnancy.',
    category: 'Reproductive Genetics',
    date: 'June 13, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '5',
    title: 'How to Read a Genetic Test Report',
    slug: 'how-to-read-a-report',
    summary: 'A step-by-step walk through variant classifications like pathogenic, benign, or variants of uncertain significance.',
    content: 'A genetic test report categorizes DNA changes (variants) into classifications standardized by the ACMG (American College of Medical Genetics). Variants are categorized as: Pathogenic (known to cause disease), Likely Pathogenic, Variant of Uncertain Significance (VUS), Likely Benign, or Benign. The clinical geneticist evaluates these classifications alongside your clinical features, medical history, and family tree to determine their significance.',
    category: 'Clinical Advice',
    date: 'June 14, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'What Is a Variant of Uncertain Significance?',
    slug: 'what-is-vus',
    summary: 'Understanding VUS results, why they occur, and how to manage the uncertainty without anxiety.',
    content: 'A Variant of Uncertain Significance (VUS) means a change in DNA has been detected, but current scientific literature lacks enough data to confirm whether it causes disease or is a benign variation. Finding a VUS is extremely common. It should not be used to make treatment decisions or trigger surgeries. Clinical geneticists monitor scientific databases and re-evaluate VUS findings over time as genomics research advances.',
    category: 'Clinical Advice',
    date: 'June 15, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '7',
    title: 'Genetics and Nutrition',
    slug: 'genetics-and-nutrition',
    summary: 'How DNA analysis helps map micronutrient needs, vitamin metabolism, and food sensitivities.',
    content: 'Nutrigenomics is the study of how individual genetic variation affects response to nutrients. For example, variants in the MTHFR gene alter folate activation, while changes in genes like MCM6 determine lactose tolerance. By understanding your genetic tendencies, we can customize nutrient intakes, trace sensitivities, and support cardiovascular health through targeted nutrition plans.',
    category: 'Genomics & Wellness',
    date: 'June 16, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '8',
    title: 'Genetics and Weight Management',
    slug: 'genetics-and-weight-management',
    summary: 'Learn how genetic responses influence satiety, fat metabolism, and weight management strategies.',
    content: 'Weight management is influenced by genetic responses. Variations in genes like FTO affect satiety patterns, food cravings, and metabolic responses to dietary fats or carbohydrates. Rather than using standard diets, wellness genomics evaluates these tendencies to structure weight loss programs based on your metabolic blueprint.',
    category: 'Genomics & Wellness',
    date: 'June 17, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '4 min read'
  },
  {
    id: '9',
    title: 'Genetics and Fitness Response',
    slug: 'genetics-and-fitness-response',
    summary: 'Discover how muscle fibers, injury recovery, and aerobic capacities are guided by DNA profile traits.',
    content: 'Your body’s response to physical training is influenced by genetic factors. The ACTN3 gene, for instance, determines sprint power vs. endurance capacity, while COL1A1 affects ligament strength and injury susceptibility. Wellness genomics helps target exercise styles (high intensity vs. steady cardio) and structure appropriate recovery times to reduce injury risk.',
    category: 'Genomics & Wellness',
    date: 'June 18, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '10',
    title: 'Family History and Inherited Risk',
    slug: 'family-history-risk',
    summary: 'Why drawing a detailed family pedigree is a cornerstone of clinical genetic assessment.',
    content: 'A detailed family history is the cornerstone of clinical genetics. By building a three-generation pedigree chart, a clinical geneticist can identify dominant or recessive inheritance patterns. This assessment helps evaluate risks for conditions like breast cancer or cardiomyopathy, supporting proactive screening and protection for family members.',
    category: 'Genetics',
    date: 'June 19, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  },
  {
    id: '11',
    title: 'Whole Exome vs Whole Genome Sequencing',
    slug: 'exome-vs-genome-sequencing',
    summary: 'Understanding sequencing differences, costs, and choosing the right test panel.',
    content: 'Whole Exome Sequencing (WES) sequences only the protein-coding regions of DNA (exons), which make up about 2% of the genome but contain ~85% of disease-causing mutations. Whole Genome Sequencing (WGS) sequences all 3 billion letters of your DNA, including introns and structural regions. While WGS provides the most comprehensive data, WES is often a highly cost-effective first step for diagnosing rare pediatric or neurological conditions.',
    category: 'Genetics',
    date: 'June 20, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '6 min read'
  },
  {
    id: '12',
    title: 'Why Genetic Results Need Professional Interpretation',
    slug: 'why-results-need-professional-interpretation',
    summary: 'Avoid misinterpretation pitfalls by seeking guidance from a clinical geneticist.',
    content: 'Genetic data requires professional interpretation. A minor variant flagged by a direct-to-consumer app could be clinically benign, while a VUS might be incorrectly assumed to be a diagnosis. To avoid unnecessary anxiety or incorrect treatments, reports must be reviewed alongside clinical symptoms and detailed family history by a qualified medical specialist.',
    category: 'Clinical Advice',
    date: 'June 21, 2026',
    author: 'Dr. Lahiru Prabodha',
    readTime: '5 min read'
  }
];


// Articles API
app.get('/api/articles', (req, res) => {
  res.json(articles);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
