const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../database/thinkskool.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create tables
const createTables = () => {
  // Users table (unified for all roles)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student', 'mentor', 'school')),
      school_id INTEGER,
      batch_id INTEGER,
      mentor_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Schools table
  db.run(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Batches table
  db.run(`
    CREATE TABLE IF NOT EXISTS batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      school_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    )
  `);

  // Assignments table
  db.run(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      student_id INTEGER NOT NULL,
      mentor_id INTEGER,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed')),
      marks INTEGER,
      feedback TEXT,
      due_date DATETIME,
      submitted_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      student_id INTEGER NOT NULL,
      status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'submitted')),
      github_url TEXT,
      demo_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Doubts table
  db.run(`
    CREATE TABLE IF NOT EXISTS doubts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      student_id INTEGER NOT NULL,
      mentor_id INTEGER,
      status TEXT DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Doubt replies table
  db.run(`
    CREATE TABLE IF NOT EXISTS doubt_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doubt_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (doubt_id) REFERENCES doubts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Attendance table
  db.run(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      date DATE NOT NULL,
      status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(student_id, date)
    )
  `);

  // Notes/Resources table
  db.run(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      file_path TEXT,
      uploaded_by INTEGER NOT NULL,
      batch_id INTEGER,
      type TEXT DEFAULT 'note' CHECK (type IN ('note', 'resource', 'announcement')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL
    )
  `);

  // Rewards/Gamification table
  db.run(`
    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      badge_name TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Announcements table
  db.run(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      batch_id INTEGER,
      mentor_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL,
      FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Activity logs table
  db.run(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL,
      user_id INTEGER,
      action_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // System stats table
  db.run(`
    CREATE TABLE IF NOT EXISTS system_stats (
      id INTEGER PRIMARY KEY DEFAULT 1,
      total_students INTEGER DEFAULT 0,
      total_mentors INTEGER DEFAULT 0,
      uptime REAL DEFAULT 0,
      last_cleanup DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database tables created successfully');
};

// Initialize database
createTables();

// Insert demo data with delay
setTimeout(() => {
  // Check if demo data already exists
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      console.error('Error checking demo data:', err);
      return;
    }

    if (row.count > 0) return;

    // Insert demo school
    db.run(`
      INSERT INTO schools (name, address, email, password) VALUES (?, ?, ?, ?)
    `, ['ThinkSkool Academy', '123 Education St, Tech City', 'admin@thinkskool.com', '$2a$10$hashedpassword'], function(err) {
      if (err) {
        console.error('Error inserting school:', err);
        return;
      }

      const schoolId = this.lastID;

      // Insert demo batches
      db.run(`
        INSERT INTO batches (name, school_id) VALUES (?, ?)
      `, ['AI-9', schoolId], function(err) {
        if (err) console.error('Error inserting batch 1:', err);
      });

      db.run(`
        INSERT INTO batches (name, school_id) VALUES (?, ?)
      `, ['Cyber-10', schoolId], function(err) {
        if (err) console.error('Error inserting batch 2:', err);
      });

      // Insert demo users
      const users = [
        ['John Doe', 'student@thinkskool.com', '$2a$10$demo123hashed', 'student', schoolId, 1, null],
        ['Jane Smith', 'student2@thinkskool.com', '$2a$10$demo123hashed', 'student', schoolId, 2, null],
        ['Dr. Sarah Johnson', 'mentor@thinkskool.com', '$2a$10$demo123hashed', 'mentor', schoolId, null, null],
        ['Admin User', 'admin@thinkskool.com', '$2a$10$demo123hashed', 'school', schoolId, null, null]
      ];

      users.forEach(user => {
        db.run(`
          INSERT INTO users (name, email, password, role, school_id, batch_id, mentor_id) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, user, function(err) {
          if (err) console.error('Error inserting user:', err);
        });
      });

      // Insert demo assignments
      db.run(`
        INSERT INTO assignments (title, description, student_id, mentor_id, due_date) VALUES (?, ?, ?, ?, ?)
      `, ['Machine Learning Project', 'Build a ML model for image classification', 1, 3, '2024-12-31'], function(err) {
        if (err) console.error('Error inserting assignment 1:', err);
      });

      db.run(`
        INSERT INTO assignments (title, description, student_id, mentor_id, due_date) VALUES (?, ?, ?, ?, ?)
      `, ['Cybersecurity Report', 'Research and report on current cyber threats', 2, 3, '2024-12-25'], function(err) {
        if (err) console.error('Error inserting assignment 2:', err);
      });

      // Insert demo attendance
      const today = new Date().toISOString().split('T')[0];
      db.run(`
        INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)
      `, [1, today, 'present'], function(err) {
        if (err) console.error('Error inserting attendance 1:', err);
      });

      db.run(`
        INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)
      `, [2, today, 'present'], function(err) {
        if (err) console.error('Error inserting attendance 2:', err);
      });

      // Insert demo rewards
      db.run(`
        INSERT INTO rewards (student_id, type, points, badge_name, description) VALUES (?, ?, ?, ?, ?)
      `, [1, 'assignment_completion', 50, 'First Assignment', 'Completed first assignment successfully'], function(err) {
        if (err) console.error('Error inserting reward 1:', err);
      });

      db.run(`
        INSERT INTO rewards (student_id, type, points, badge_name, description) VALUES (?, ?, ?, ?, ?)
      `, [2, 'attendance_streak', 25, 'Perfect Attendance', '7 days perfect attendance'], function(err) {
        if (err) console.error('Error inserting reward 2:', err);
      });

      console.log('Demo data inserted successfully');
    });
  });
}, 1000);

module.exports = db;
