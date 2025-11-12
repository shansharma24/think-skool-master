const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const cleanupFiles = async () => {
  try {
    const summary = {
      filesDeleted: 0,
      spaceFreed: 0,
      errors: 0
    };

    // Get all files in uploads directory
    const files = fs.readdirSync(UPLOADS_DIR);

    for (const file of files) {
      const filePath = path.join(UPLOADS_DIR, file);

      try {
        // Check if file exists in database
        const fileExists = db.prepare(`
          SELECT COUNT(*) as count FROM resources WHERE file_path = ?
        `).get(file);

        // If file is not referenced in database and is older than 30 days, delete it
        if (fileExists.count === 0) {
          const stats = fs.statSync(filePath);
          const fileAge = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24); // days

          if (fileAge > 30) {
            fs.unlinkSync(filePath);
            summary.filesDeleted++;
            summary.spaceFreed += stats.size / (1024 * 1024); // MB
          }
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        summary.errors++;
      }
    }

    // Log cleanup activity
    db.prepare(`
      INSERT INTO activity_logs (message, action_type) VALUES (?, ?)
    `).run(`Cleanup completed: ${summary.filesDeleted} files deleted, ${summary.spaceFreed.toFixed(2)} MB freed`, 'cleanup');

    // Update system stats
    db.prepare(`
      UPDATE system_stats SET last_cleanup = CURRENT_TIMESTAMP WHERE id = 1
    `).run();

    console.log('File cleanup completed:', summary);
    return summary;
  } catch (error) {
    console.error('Error during file cleanup:', error);
    throw error;
  }
};

module.exports = {
  cleanupFiles,
  UPLOADS_DIR
};
