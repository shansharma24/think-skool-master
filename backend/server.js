require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

// Import database and utilities
const db = require('./config/db');
const { cleanupFiles, sendCleanupEmail } = require('./utils/fileCleaner');
const { sendWeeklyDigest } = require('./utils/emailService');

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/school', schoolRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Automated tasks
// Weekly cleanup (every Sunday at midnight)
cron.schedule('0 0 * * 0', async () => {
  console.log('Running weekly cleanup...');
  try {
    const summary = await cleanupFiles();
    await sendCleanupEmail(summary);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});

// Weekly mentor digest (every Monday at 9 AM)
cron.schedule('0 9 * * 1', async () => {
  console.log('Sending weekly mentor digests...');
  try {
    // Get all mentors
    const mentors = db.prepare('SELECT id, email FROM users WHERE role = ?').all('mentor');

    for (const mentor of mentors) {
      // Get mentor's stats for the week
      const stats = db.prepare(`
        SELECT
          COUNT(DISTINCT a.student_id) as activeStudents,
          COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) as assignmentsCompleted,
          AVG(CASE WHEN att.status = 'present' THEN 100 ELSE 0 END) as avgAttendance
        FROM assignments a
        LEFT JOIN attendance att ON att.student_id = a.student_id
        WHERE a.mentor_id = ? AND a.created_at >= datetime('now', '-7 days')
      `).get(mentor.id);

      if (stats.activeStudents > 0) {
        await sendWeeklyDigest(mentor.email, {
          avgAttendance: Math.round(stats.avgAttendance || 0),
          assignmentsCompleted: stats.assignmentsCompleted || 0,
          activeStudents: stats.activeStudents || 0
        });
      }
    }
  } catch (error) {
    console.error('Weekly digest error:', error);
  }
});

// Update system stats every hour
cron.schedule('0 * * * *', () => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(CASE WHEN role = 'student' THEN 1 END) as totalStudents,
        COUNT(CASE WHEN role = 'mentor' THEN 1 END) as totalMentors
      FROM users
    `).get();

    const uptime = process.uptime();

    db.prepare(`
      INSERT OR REPLACE INTO system_stats (id, total_students, total_mentors, uptime, created_at)
      VALUES (1, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(stats.totalStudents, stats.totalMentors, uptime);
  } catch (error) {
    console.error('System stats update error:', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ThinkSkool Backend Server running on port ${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🧹 File cleanup: Scheduled for every Sunday at midnight`);
  console.log(`📈 Weekly reports: Scheduled for every Monday at 9 AM`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close();
  process.exit(0);
});

module.exports = app;
