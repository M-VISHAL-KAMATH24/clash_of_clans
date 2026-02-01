require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const clanRoutes = require('./routes/clans');
const playerRoutes = require("./routes/players");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Routes
app.use('/api/clans', clanRoutes);
app.use("/api/players", playerRoutes);


// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// ✅ FIXED: Express 5 compatible 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
