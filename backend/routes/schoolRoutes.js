const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Get school admin dashboard data
router.get('/dashboard', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const schoolId = req.user.id;

    // Get school stats
    const stats = db.prepare(`
      SELECT
        COUNT(DISTINCT u.id) as totalStudents,
        COUNT(DISTINCT m.id) as totalMentors,
        COUNT(DISTINCT b.id) as totalBatches,
        AVG(CASE WHEN att.status = 'present' THEN 100 ELSE 0 END) as avgAttendance,
        COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) * 100.0 / COUNT(a.id) as assignmentCompletionRate
      FROM users u
      LEFT JOIN users m ON m.role = 'mentor' AND m.school_id = ?
      LEFT JOIN batches b ON b.school_id = ?
      LEFT JOIN attendance att ON att.student_id = u.id
      LEFT JOIN assignments a ON a.student_id = u.id
      WHERE u.school_id = ?
    `).get(schoolId, schoolId, schoolId);

    // Get batch performance
    const batchPerformance = db.prepare(`
      SELECT
        b.name as batch_name,
        COUNT(DISTINCT u.id) as student_count,
        AVG(a.marks) as avg_marks,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) * 100.0 / COUNT(att.id) as attendance_rate
      FROM batches b
      LEFT JOIN users u ON u.batch_id = b.id
      LEFT JOIN assignments a ON a.student_id = u.id
      LEFT JOIN attendance att ON att.student_id = u.id
      WHERE b.school_id = ?
      GROUP BY b.id, b.name
    `).all(schoolId);

    res.json({
      stats: {
        totalStudents: stats.totalStudents || 0,
        totalMentors: stats.totalMentors || 0,
        totalBatches: stats.totalBatches || 0,
        avgAttendance: Math.round(stats.avgAttendance || 0),
        assignmentCompletionRate: Math.round(stats.assignmentCompletionRate || 0)
      },
      batchPerformance
    });
  } catch (error) {
    console.error('School dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new batch
router.post('/create-batch', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const { name } = req.body;
    const schoolId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: 'Batch name is required' });
    }

    const result = db.prepare(`
      INSERT INTO batches (name, school_id) VALUES (?, ?)
    `).run(name, schoolId);

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (message, user_id, action_type)
      VALUES (?, ?, ?)
    `).run(`Batch "${name}" created`, schoolId, 'create_batch');

    res.status(201).json({
      message: 'Batch created successfully',
      batchId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assign mentor to batch
router.patch('/assign-mentor', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const { mentorId, batchId } = req.body;
    const schoolId = req.user.id;

    if (!mentorId || !batchId) {
      return res.status(400).json({ message: 'Mentor ID and Batch ID are required' });
    }

    // Verify mentor belongs to school
    const mentor = db.prepare(`
      SELECT id FROM users WHERE id = ? AND role = 'mentor' AND school_id = ?
    `).get(mentorId, schoolId);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found in your school' });
    }

    // Verify batch belongs to school
    const batch = db.prepare(`
      SELECT id FROM batches WHERE id = ? AND school_id = ?
    `).get(batchId, schoolId);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found in your school' });
    }

    // Update mentor assignment
    db.prepare(`
      UPDATE users SET batch_id = ? WHERE id = ?
    `).run(batchId, mentorId);

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (message, user_id, action_type)
      VALUES (?, ?, ?)
    `).run(`Mentor assigned to batch ${batchId}`, schoolId, 'assign_mentor');

    res.json({ message: 'Mentor assigned successfully' });
  } catch (error) {
    console.error('Assign mentor error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get school analytics
router.get('/analytics', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const schoolId = req.user.id;

    // Overall analytics
    const overallStats = db.prepare(`
      SELECT
        COUNT(DISTINCT u.id) as totalStudents,
        COUNT(DISTINCT m.id) as activeMentors,
        AVG(CASE WHEN att.status = 'present' THEN 100 ELSE 0 END) as avgAttendance,
        COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) * 100.0 / COUNT(a.id) as assignmentCompletion
      FROM users u
      LEFT JOIN users m ON m.role = 'mentor' AND m.school_id = ?
      LEFT JOIN attendance att ON att.student_id = u.id
      LEFT JOIN assignments a ON a.student_id = u.id
      WHERE u.school_id = ?
    `).get(schoolId, schoolId);

    // Monthly trends
    const monthlyTrends = db.prepare(`
      SELECT
        strftime('%Y-%m', att.date) as month,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) * 100.0 / COUNT(att.id) as attendance_rate,
        COUNT(DISTINCT a.id) as assignments_completed
      FROM attendance att
      LEFT JOIN assignments a ON a.student_id = att.student_id AND a.status = 'submitted'
      JOIN users u ON att.student_id = u.id
      WHERE u.school_id = ?
      GROUP BY strftime('%Y-%m', att.date)
      ORDER BY month DESC
      LIMIT 12
    `).all(schoolId);

    res.json({
      overallStats,
      monthlyTrends
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get attendance data
router.get('/attendance', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const schoolId = req.user.id;

    const attendanceData = db.prepare(`
      SELECT
        u.name as student_name,
        b.name as batch_name,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) as present_days,
        COUNT(att.id) as total_days,
        COUNT(CASE WHEN att.status = 'present' THEN 1 END) * 100.0 / COUNT(att.id) as attendance_percentage
      FROM users u
      LEFT JOIN batches b ON u.batch_id = b.id
      LEFT JOIN attendance att ON u.id = att.student_id
      WHERE u.school_id = ? AND u.role = 'student'
      GROUP BY u.id, u.name, b.name
      ORDER BY attendance_percentage DESC
    `).all(schoolId);

    res.json(attendanceData);
  } catch (error) {
    console.error('Attendance error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export data as CSV
router.get('/export', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const schoolId = req.user.id;
    const { type } = req.query; // 'students', 'attendance', 'assignments'

    let data;
    let filename;
    let headers;

    switch (type) {
      case 'students':
        data = db.prepare(`
          SELECT u.name, u.email, b.name as batch, m.name as mentor,
                 COUNT(a.id) as total_assignments,
                 AVG(a.marks) as avg_marks
          FROM users u
          LEFT JOIN batches b ON u.batch_id = b.id
          LEFT JOIN users m ON u.mentor_id = m.id
          LEFT JOIN assignments a ON u.id = a.student_id
          WHERE u.school_id = ? AND u.role = 'student'
          GROUP BY u.id, u.name, u.email, b.name, m.name
        `).all(schoolId);
        filename = 'students.csv';
        headers = ['Name', 'Email', 'Batch', 'Mentor', 'Total Assignments', 'Average Marks'];
        break;

      case 'attendance':
        data = db.prepare(`
          SELECT u.name, att.date, att.status
          FROM attendance att
          JOIN users u ON att.student_id = u.id
          WHERE u.school_id = ?
          ORDER BY att.date DESC, u.name
        `).all(schoolId);
        filename = 'attendance.csv';
        headers = ['Student Name', 'Date', 'Status'];
        break;

      case 'assignments':
        data = db.prepare(`
          SELECT u.name as student_name, a.title, a.status, a.marks, a.feedback
          FROM assignments a
          JOIN users u ON a.student_id = u.id
          WHERE u.school_id = ?
          ORDER BY a.created_at DESC
        `).all(schoolId);
        filename = 'assignments.csv';
        headers = ['Student Name', 'Assignment Title', 'Status', 'Marks', 'Feedback'];
        break;

      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    // Convert to CSV
    let csv = headers.join(',') + '\n';
    data.forEach(row => {
      const values = headers.map(header => {
        const key = header.toLowerCase().replace(/ /g, '_');
        return JSON.stringify(row[key] || '');
      });
      csv += values.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get activity logs
router.get('/logs', authenticateToken, authorizeRole(['school']), (req, res) => {
  try {
    const logs = db.prepare(`
      SELECT al.*, u.name as user_name
      FROM activity_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ORDER BY al.created_at DESC
      LIMIT 100
    `).all();

    res.json(logs);
  } catch (error) {
    console.error('Logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
