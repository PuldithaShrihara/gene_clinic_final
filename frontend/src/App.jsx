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

// New Pages (None for appointments branch)

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
