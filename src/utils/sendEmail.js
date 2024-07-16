const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: false, //true
  port: 25, //465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (email, subject, html) => {
  let mailDetail = {
    to: email,
    subject: subject,
    html: html, // html body
  };
  return transport.sendMail(mailDetail, function (error, res) {
    if (error) throw error;
    else return res;
  });
};

module.exports = { sendEmail };
