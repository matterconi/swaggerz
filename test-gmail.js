// Test script per verificare credenziali Gmail
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testGmailCredentials() {
  console.log('🔧 Testing Gmail credentials...');
  console.log(`📧 EMAIL_USER: ${process.env.EMAIL_USER ? '[SET]' : '[NOT SET]'}`);
  console.log(`🔑 EMAIL_PASS: ${process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]'}`);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ EMAIL_USER or EMAIL_PASS not set in .env.local');
    return;
  }

  try {
    console.log('\n🚀 Creating transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('📞 Verifying connection...');
    await transporter.verify();
    console.log('✅ Gmail connection successful!');
    
    console.log('\n📧 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Invia a te stesso
      subject: '✅ Test Gmail/Nodemailer Connection',
      html: `
        <h2>🎉 Gmail/Nodemailer Test Successful!</h2>
        <p>Se ricevi questa email, la configurazione Gmail è corretta.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log('🎯 Check your email inbox!');
    
  } catch (error) {
    console.error('❌ Gmail test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 TROUBLESHOOTING STEPS:');
      console.log('1. Make sure 2FA is enabled on your Google account');
      console.log('2. Generate a new App Password at: https://myaccount.google.com/apppasswords');
      console.log('3. Use the 16-character App Password (not your regular password)');
      console.log('4. Update EMAIL_PASS in your .env.local file');
    }
  }
}

testGmailCredentials();