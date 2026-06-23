import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared Layout Components
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import StickyMobileCTA from './components/StickyMobileCTA';
import CallbackModal from './components/CallbackModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Clinic from './pages/Clinic';
import Services from './pages/Services';
import TestPackages from './pages/TestPackages';
import WellnessBlueprint from './pages/WellnessBlueprint';
import Nipt from './pages/Nipt';
import Journey from './pages/Journey';
import Articles from './pages/Articles';
import Appointments from './pages/Appointments';
import AdminDashboard from './pages/AdminDashboard';
import Research from './pages/Research';

// New Pages
import Education from './pages/Education';
import Faq from './pages/Faq';

// Simple Legal Subpages to resolve footer links
function PrivacyPolicy() {
  return (
    <div className="container py-12 animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="text-gradient">Privacy Policy</h1>
      <p style={{ marginTop: '20px' }}>
        Last updated: June 16, 2026. At The Gene Clinic, we take the confidentiality of your health data very seriously. All patient files, pedigree structures, and genetic testing outcomes are handled strictly in accordance with national medical privacy guidelines and HIPAA/GDPR health confidentiality requirements.
      </p>
      <p style={{ marginTop: '16px' }}>
        We do not sell or share patient identifiers with third parties. Your records are only released to external partner laboratories for the purpose of genetic testing and to clinical specialists involved in your direct medical care.
      </p>
    </div>
  );
}

function TermsConditions() {
  return (
    <div className="container py-12 animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="text-gradient">Terms & Conditions</h1>
      <p style={{ marginTop: '20px' }}>
        Last updated: June 16, 2026. The information and education contents on this site are designed to explain the general concepts of clinical genetics, DNA testing, and familial disease risk. They do not constitute formal diagnostic medical reports or treatment guidelines.
      </p>
      <p style={{ marginTop: '16px' }}>
        Users must seek a direct consultation with Dr. Lahiru Prabodha or a qualified health practitioner to interpret genetic findings in the context of their specific medical history.
      </p>
    </div>
  );
}

export default function App() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <Router>
      <div className="app-wrapper">
        <TopBar onOpenCallbackModal={() => setIsCallbackOpen(true)} />
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<TestPackages onOpenCallbackModal={() => setIsCallbackOpen(true)} />} />
            <Route path="/blueprint" element={<WellnessBlueprint />} />
            <Route path="/nipt" element={<Nipt />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/research" element={<Research />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/education" element={<Education />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Floating actions */}
        <WhatsAppFloat />
        <StickyMobileCTA />
        
        {/* Callback Request Modal */}
        <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
      </div>
    </Router>
  );
}
