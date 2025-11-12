const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { UPLOADS_DIR } = require('../utils/fileCleaner');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get student dashboard data
router.get('/dashboard', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student stats
    const stats = db.prepare(`
      SELECT
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completedProjects,
        COUNT(CASE WHEN status = 'submitted' THEN 1 END) as submittedAssignments,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as presentDays,
        COUNT(*) as totalAttendance
      FROM (
        SELECT 'project' as type, status FROM projects WHERE student_id = ?
        UNION ALL
        SELECT 'assignment' as type, status FROM assignments WHERE student_id = ?
        UNION ALL
        SELECT 'attendance' as type, status FROM attendance WHERE student_id = ?
      )
    `).get(studentId, studentId, studentId);

    // Get recent assignments
    const assignments = db.prepare(`
      SELECT id, title, status, marks, due_date, submitted_at
      FROM assignments
      WHERE student_id = ?
      ORDER BY created_at DESC LIMIT 5
    `).all(studentId);

    // Get recent projects
    const projects = db.prepare(`
      SELECT id, title, status, created_at
      FROM projects
      WHERE student_id = ?
      ORDER BY created_at DESC LIMIT 3
    `).all(studentId);

    // Get rewards/points
    const rewards = db.prepare(`
      SELECT SUM(points) as totalPoints, COUNT(*) as badgesEarned
      FROM rewards
      WHERE student_id = ?
    `).get(studentId);

    // Get attendance percentage
    const attendanceRate = stats.totalAttendance > 0
      ? Math.round((stats.presentDays / stats.totalAttendance) * 100)
      : 0;

    res.json({
      stats: {
        completedProjects: stats.completedProjects || 0,
        submittedAssignments: stats.submittedAssignments || 0,
        attendanceRate,
        totalPoints: rewards.totalPoints || 0,
        badgesEarned: rewards.badgesEarned || 0
      },
      assignments,
      projects,
      rewards: db.prepare(`
        SELECT type, points, badge_name, description, created_at
        FROM rewards
        WHERE student_id = ?
        ORDER BY created_at DESC LIMIT 10
      `).all(studentId)
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student assignments
router.get('/assignments', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const assignments = db.prepare(`
      SELECT a.*, u.name as mentor_name
      FROM assignments a
      LEFT JOIN users u ON a.mentor_id = u.id
      WHERE a.student_id = ?
      ORDER BY a.created_at DESC
    `).all(req.user.id);

    res.json(assignments);
  } catch (error) {
    console.error('Assignments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Submit assignment
router.post('/assignments/:id/submit', authenticateToken, authorizeRole(['student']), upload.single('file'), (req, res) => {
  try {
    const assignmentId = req.params.id;
    const studentId = req.user.id;
    const { description } = req.body;
    const filePath = req.file ? req.file.filename : null;

    // Check if assignment belongs to student
    const assignment = db.prepare(`
      SELECT * FROM assignments WHERE id = ? AND student_id = ?
    `).get(assignmentId, studentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Update assignment
    db.prepare(`
      UPDATE assignments
      SET status = 'submitted', submitted_at = CURRENT_TIMESTAMP, description = ?
      WHERE id = ?
    `).run(description || '', assignmentId);

    // Award points for submission
    db.prepare(`
      INSERT INTO rewards (student_id, type, points, description)
      VALUES (?, 'assignment_submission', 10, 'Assignment submitted successfully')
    `).run(studentId);

    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student projects
router.get('/projects', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const projects = db.prepare(`
      SELECT * FROM projects
      WHERE student_id = ?
      ORDER BY created_at DESC
    `).all(req.user.id);

    res.json(projects);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ask a doubt
router.post('/ask-doubt', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const { title, description } = req.body;
    const studentId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const result = db.prepare(`
      INSERT INTO doubts (title, description, student_id)
      VALUES (?, ?, ?)
    `).run(title, description, studentId);

    res.status(201).json({
      message: 'Doubt posted successfully',
      doubtId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Ask doubt error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student doubts
router.get('/doubts', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const doubts = db.prepare(`
      SELECT d.*, u.name as mentor_name,
             (SELECT COUNT(*) FROM doubt_replies dr WHERE dr.doubt_id = d.id) as reply_count
      FROM doubts d
      LEFT JOIN users u ON d.mentor_id = u.id
      WHERE d.student_id = ?
      ORDER BY d.created_at DESC
    `).all(req.user.id);

    res.json(doubts);
  } catch (error) {
    console.error('Doubts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student attendance
router.get('/attendance', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const attendance = db.prepare(`
      SELECT date, status
      FROM attendance
      WHERE student_id = ?
      ORDER BY date DESC
    `).all(req.user.id);

    res.json(attendance);
  } catch (error) {
    console.error('Attendance error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student analytics
router.get('/analytics', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const studentId = req.user.id;

    // Monthly attendance data
    const attendanceData = db.prepare(`
      SELECT
        strftime('%Y-%m', date) as month,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present,
        COUNT(*) as total
      FROM attendance
      WHERE student_id = ?
      GROUP BY strftime('%Y-%m', date)
      ORDER BY month DESC
      LIMIT 12
    `).all(studentId);

    // Assignment completion over time
    const assignmentData = db.prepare(`
      SELECT
        strftime('%Y-%m', submitted_at) as month,
        COUNT(*) as completed
      FROM assignments
      WHERE student_id = ? AND status = 'submitted'
      GROUP BY strftime('%Y-%m', submitted_at)
      ORDER BY month DESC
      LIMIT 12
    `).all(studentId);

    // Performance metrics
    const performance = db.prepare(`
      SELECT
        AVG(marks) as avgMarks,
        COUNT(CASE WHEN marks >= 80 THEN 1 END) as excellentCount,
        COUNT(CASE WHEN marks >= 60 AND marks < 80 THEN 1 END) as goodCount,
        COUNT(CASE WHEN marks < 60 THEN 1 END) as needsImprovementCount
      FROM assignments
      WHERE student_id = ? AND marks IS NOT NULL
    `).get(studentId);

    res.json({
      attendanceData,
      assignmentData,
      performance
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update student profile
router.patch('/profile', authenticateToken, authorizeRole(['student']), (req, res) => {
  try {
    const { name, email } = req.body;
    const studentId = req.user.id;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    db.prepare(`
      UPDATE users
      SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, email, studentId);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
