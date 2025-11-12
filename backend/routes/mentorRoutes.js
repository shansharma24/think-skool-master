const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { sendWeeklyDigest } = require('../utils/emailService');
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

// Get mentor dashboard data
router.get('/dashboard', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const mentorId = req.user.id;

    // Get mentor stats
    const stats = db.prepare(`
      SELECT
        COUNT(DISTINCT a.student_id) as totalStudents,
        COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) as pendingReviews,
        COUNT(CASE WHEN a.status = 'reviewed' THEN 1 END) as completedReviews,
        COUNT(d.id) as activeDoubts
      FROM assignments a
      LEFT JOIN doubts d ON d.mentor_id = ? AND d.status = 'open'
      WHERE a.mentor_id = ?
    `).get(mentorId, mentorId);

    // Get recent assignments for review
    const pendingAssignments = db.prepare(`
      SELECT a.id, a.title, u.name as student_name, a.submitted_at
      FROM assignments a
      JOIN users u ON a.student_id = u.id
      WHERE a.mentor_id = ? AND a.status = 'submitted'
      ORDER BY a.submitted_at DESC
      LIMIT 5
    `).all(mentorId);

    // Get recent doubts
    const recentDoubts = db.prepare(`
      SELECT d.id, d.title, u.name as student_name, d.created_at
      FROM doubts d
      JOIN users u ON d.student_id = u.id
      WHERE d.mentor_id = ? AND d.status = 'open'
      ORDER BY d.created_at DESC
      LIMIT 5
    `).all(mentorId);

    res.json({
      stats,
      pendingAssignments,
      recentDoubts
    });
  } catch (error) {
    console.error('Mentor dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get mentor's students
router.get('/students', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const mentorId = req.user.id;

    const students = db.prepare(`
      SELECT
        u.id, u.name, u.email,
        COUNT(a.id) as totalAssignments,
        COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) as submittedAssignments,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) * 100.0 / COUNT(att.id) as attendanceRate,
        AVG(a.marks) as avgMarks
      FROM users u
      LEFT JOIN assignments a ON u.id = a.student_id AND a.mentor_id = ?
      LEFT JOIN attendance att ON u.id = att.student_id
      WHERE u.mentor_id = ?
      GROUP BY u.id, u.name, u.email
    `).all(mentorId, mentorId);

    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Review assignment
router.post('/review-assignment', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const { assignmentId, marks, feedback } = req.body;
    const mentorId = req.user.id;

    if (!assignmentId || marks === undefined || !feedback) {
      return res.status(400).json({ message: 'Assignment ID, marks, and feedback are required' });
    }

    // Check if assignment belongs to mentor
    const assignment = db.prepare(`
      SELECT * FROM assignments WHERE id = ? AND mentor_id = ?
    `).get(assignmentId, mentorId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Update assignment
    db.prepare(`
      UPDATE assignments
      SET status = 'reviewed', marks = ?, feedback = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(marks, feedback, assignmentId);

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (message, user_id, action_type)
      VALUES (?, ?, ?)
    `).run(`Assignment ${assignmentId} reviewed by mentor`, mentorId, 'review');

    res.json({ message: 'Assignment reviewed successfully' });
  } catch (error) {
    console.error('Review assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Post announcement
router.post('/announcement', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const { title, message, batchId } = req.body;
    const mentorId = req.user.id;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const result = db.prepare(`
      INSERT INTO announcements (title, message, batch_id, mentor_id)
      VALUES (?, ?, ?, ?)
    `).run(title, message, batchId || null, mentorId);

    res.status(201).json({
      message: 'Announcement posted successfully',
      announcementId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Post announcement error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get mentor announcements
router.get('/announcements', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const announcements = db.prepare(`
      SELECT a.*, b.name as batch_name
      FROM announcements a
      LEFT JOIN batches b ON a.batch_id = b.id
      WHERE a.mentor_id = ?
      ORDER BY a.created_at DESC
    `).all(req.user.id);

    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload resource
router.post('/resource', authenticateToken, authorizeRole(['mentor']), upload.single('file'), (req, res) => {
  try {
    const { title, description, batchId } = req.body;
    const mentorId = req.user.id;
    const filePath = req.file ? req.file.filename : null;

    if (!title || !filePath) {
      return res.status(400).json({ message: 'Title and file are required' });
    }

    const result = db.prepare(`
      INSERT INTO resources (title, description, file_path, uploaded_by, batch_id, type)
      VALUES (?, ?, ?, ?, ?, 'resource')
    `).run(title, description || '', filePath, mentorId, batchId || null);

    res.status(201).json({
      message: 'Resource uploaded successfully',
      resourceId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Upload resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reply to doubt
router.post('/reply-doubt', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const { doubtId, message } = req.body;
    const mentorId = req.user.id;

    if (!doubtId || !message) {
      return res.status(400).json({ message: 'Doubt ID and message are required' });
    }

    // Check if doubt is assigned to mentor
    const doubt = db.prepare(`
      SELECT * FROM doubts WHERE id = ? AND mentor_id = ?
    `).get(doubtId, mentorId);

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found or not assigned to you' });
    }

    // Insert reply
    db.prepare(`
      INSERT INTO doubt_replies (doubt_id, user_id, message)
      VALUES (?, ?, ?)
    `).run(doubtId, mentorId, message);

    // Update doubt status
    db.prepare(`
      UPDATE doubts SET status = 'answered', updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(doubtId);

    res.json({ message: 'Reply posted successfully' });
  } catch (error) {
    console.error('Reply doubt error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get mentor reports/analytics
router.get('/reports', authenticateToken, authorizeRole(['mentor']), (req, res) => {
  try {
    const mentorId = req.user.id;

    // Student performance data
    const studentPerformance = db.prepare(`
      SELECT
        u.name as student_name,
        COUNT(a.id) as total_assignments,
        AVG(a.marks) as avg_marks,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) * 100.0 / COUNT(att.id) as attendance_rate
      FROM users u
      LEFT JOIN assignments a ON u.id = a.student_id AND a.mentor_id = ?
      LEFT JOIN attendance att ON u.id = att.student_id
      WHERE u.mentor_id = ?
      GROUP BY u.id, u.name
    `).all(mentorId, mentorId);

    // Monthly submission trends
    const submissionTrends = db.prepare(`
      SELECT
        strftime('%Y-%m', submitted_at) as month,
        COUNT(*) as submissions
      FROM assignments
      WHERE mentor_id = ? AND status = 'submitted'
      GROUP BY strftime('%Y-%m', submitted_at)
      ORDER BY month DESC
      LIMIT 12
    `).all(mentorId);

    res.json({
      studentPerformance,
      submissionTrends
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
