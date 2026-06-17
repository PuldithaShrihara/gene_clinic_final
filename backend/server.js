import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));



let contactMessages = [];



// Contact API
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing name, email or message' });
  }

  const newMessage = {
    id: String(contactMessages.length + 1),
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    createdAt: new Date().toISOString()
  };

  contactMessages.push(newMessage);
  res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
