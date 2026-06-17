import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));


// Articles Data




// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
