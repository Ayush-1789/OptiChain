const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory user store
const users = [
  { id: 1, email: 'admin@walmart.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'inventory@walmart.com', password: 'inventory123', role: 'inventory' },
  { id: 3, email: 'logistics@walmart.com', password: 'logistics123', role: 'logistics' },
  { id: 4, email: 'analyst@walmart.com', password: 'analyst123', role: 'analyst' },
];

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'walmart-quantum-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Role-based access control
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Authentication endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'walmart-quantum-secret',
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Walmart Quantum Supply Chain Suite API is running',
    timestamp: new Date().toISOString()
  });
});

// Protected demo endpoint
app.get('/api/demo', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome to the demo, ${req.user.email}!`,
    role: req.user.role,
    features: [
      'Inventory Simulator',
      'Returns Radar',
      'Supply Mesh',
      'Demand DNA',
      'Smart Drop Sync',
      'DropBot',
      'LoadSwap'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Walmart Quantum Supply Chain Suite API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
