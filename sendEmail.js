const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'virel19@gmail.com',
    pass: `${process.env.GMAIL_PASS}`,
  }
});

function sendShortEmail(emailContent) {
  
  const mailOptionsShort = {
    from: `${process.env.GMAIL}`,
    to: `${process.env.GMAIL}`,
    subject: 'SHORT',
    text: emailContent,
  };

  transporter.sendMail(mailOptionsShort, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendLongEmail(emailContent) {

  const mailOptionsLong = {
    from: `${process.env.GMAIL}`,
    to: `${process.env.GMAIL}`,
    subject: 'LONG',
    text: emailContent,
  };

  transporter.sendMail(mailOptionsLong, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendOpenInterest(emailContent) {

  const mailOptionsLong = {
    from: `${process.env.GMAIL}`,
    to: `${process.env.GMAIL}`,
    subject: 'OPEN INTEREST',
    text: emailContent,
  };
  
  transporter.sendMail(mailOptionsLong, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendShortEmail,
  sendLongEmail,
  sendOpenInterest,
};