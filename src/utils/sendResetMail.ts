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
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              max-width: 150px;
              display: block;
              margin: 0 auto;
            }
            .message {
              margin-bottom: 20px;
            }
            .footer {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img class="logo" src="https://lh3.googleusercontent.com/a/ACg8ocKBzK3f03dgoW9itQvTCrfmmXzh_14FHsQERlM0UU8LQA=s360-c-no" alt="MyPersonalBank Logo">
            </div>
            <div class="message">
              <p>Dear Customer,</p>
              <p>We have received a request to reset your MyPersonalBank account password. Your new password is provided below:</p>
              <p><strong>New Password:</strong> ${newPassword}</p>
              <p>For security reasons, we recommend changing this temporary password after you log in. If you didn't request this password reset, please contact our support team immediately.</p>
              <p>Thank you for choosing MyPersonalBank.</p>
            </div>
            <div class="footer">
              <p>Sincerely,</p>
              <p>MyPersonalBank Support Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
