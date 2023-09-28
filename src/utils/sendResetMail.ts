const nodemailer = require('nodemailer');
 
export async function sendResetEmail(email, newPassword) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mypersonalbank.resetmail@gmail.com',
      pass: 'oore plza hwrf pzxo',
    },
  });

  const mailOptions = {
    from: 'mypersonalbank.resetmail@gmail.com',
    to: email,
    subject: 'Reset Password - MyPersonalBank',
    text: `Dear Customer,

    We have received a request to reset your MyPersonalBank account password. Your new password is provided below:

    New Password: ${newPassword}

    For security reasons, we recommend changing this temporary password after you log in. If you didn't request this password reset, please contact our support team immediately.

    Thank you for choosing MyPersonalBank.

    Sincerely,
    MyPersonalBank Support Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
