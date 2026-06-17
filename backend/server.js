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


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
