const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendCleanupEmail = async (summary) => {
  const html = `
    <h2>ThinkSkool System Cleanup Report</h2>
    <p>Automated cleanup completed successfully.</p>
    <ul>
      <li>Files deleted: ${summary.filesDeleted}</li>
      <li>Space freed: ${summary.spaceFreed} MB</li>
      <li>Errors: ${summary.errors}</li>
    </ul>
    <p>Next cleanup scheduled for next Sunday at midnight.</p>
  `;

  await sendEmail('admin@thinkskool.com', 'System Cleanup Report', html);
};

const sendWeeklyDigest = async (mentorEmail, data) => {
  const html = `
    <h2>Weekly Performance Digest</h2>
    <p>Here's your students' performance summary for this week:</p>
    <ul>
      <li>Average attendance: ${data.avgAttendance}%</li>
      <li>Assignments completed: ${data.assignmentsCompleted}</li>
      <li>Active students: ${data.activeStudents}</li>
    </ul>
    <p>Keep up the great work!</p>
  `;

  await sendEmail(mentorEmail, 'Weekly Student Performance Digest', html);
};

module.exports = {
  sendEmail,
  sendCleanupEmail,
  sendWeeklyDigest
};
