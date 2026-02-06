require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

app.get('/', (req, res) => {
  return res.send({ message : "backend is up and running"})
})
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

// Import Routes
const profileRoutes = require('./routes/profile');
app.use('/api', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
