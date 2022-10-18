const nodemailer = require("nodemailer");

//Configuramos nodemailer para el envio de correos
const sendEmail = async (emailUser) => {
  let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false },
    logger: true,
    debug: true,
  });

  let mailDetail = {
    from: process.env.GMAIL_EMAIL,
    to: emailUser,
    subject: "***EMAIL IMPORTANTE",
    text: "Este es en correo enviado desde Nodemailer",
  };

  try {
    await mailTransporter.sendMail(mailDetail);
  } catch (error) {
    return res.status(500).json({ message: "Error al enviar el correo " });
  }
};

module.exports = { sendEmail };
