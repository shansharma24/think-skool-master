const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    let user;
    let tableName;

    if (role === 'school') {
      tableName = 'schools';
      user = db.prepare('SELECT * FROM schools WHERE email = ?').get(email);
    } else {
      tableName = 'users';
      user = db.prepare('SELECT * FROM users WHERE email = ? AND role = ?').get(email, role);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For demo purposes, accept demo passwords
    const isValidPassword = password === 'demo123' ||
      (role === 'student' && password === 'demo123') ||
      (role === 'mentor' && password === 'demo123') ||
      (role === 'school' && password === 'demo123') ||
      await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log login activity
    db.prepare(`
      INSERT INTO activity_logs (message, user_id, action_type) VALUES (?, ?, ?)
    `).run(`${role} ${user.name} logged in`, user.id, 'login');

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register endpoint (for demo purposes)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, schoolId, batchId } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, school_id, batch_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, hashedPassword, role, schoolId || null, batchId || null);

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
