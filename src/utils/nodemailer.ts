import nodemailer from "nodemailer";
import config from "../config";


const mail = {
  user: config.USEREMAIL,
  pass: config.PASSEMAIL,
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (email: string, subject: string, html: string) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: `"MHcode 👻" <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el email ", error);
  }
};

const getTemplate = (name: string, randomNumber: string, device: string) => {
  if (device === "movil") {
    return `
    <h1 style="color:#000;font-size:20px;">¡Estimado ${name}!</h1>
    <p style="color:#000;font-size:14px;">Gracias por registrarte en El aplicativo TimeCheck! Para completar el proceso de registro y asegurarnos de que tu dirección de correo electrónico sea válida, necesitamos que verifiques tu cuenta.</p>
    <p style="color:#000;font-size:14px;">Para verificar tu cuenta, ingresa este codigo en la movil: <span style="display:color:#000;font-size:16px;padding:10px 20px;text-decoration:none;"">${randomNumber}</span></p>
    <p style="color:#000;font-size:14px;">Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte a través este enlace: </p>
    <a href="https://timecheck.netlify.app/ContactUs" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Información de contacto</a>
    <p style="color:#000;font-size:14px;">¡Esperamos verte pronto en TimeCheck y que disfrutes de una experiencia fluida y eficiente en la gestión de tus eventos!</p>
    <p style="color:#000;font-size:14px;">Atentamente</p>
    <p style="color:#000;font-size:14px;">El equipo de TimeCheck</p>
  `;
  } else if (device === "pc") {
    return `
    <h1 style="color:#000;font-size:20px;">¡Estimado ${name}!</h1>
    <p style="color:#000;font-size:14px;">Gracias por registrarte en El aplicativo TimeCheck! Para completar el proceso de registro y asegurarnos de que tu dirección de correo electrónico sea válida, necesitamos que verifiques tu cuenta.</p>
    <p style="color:#000;font-size:14px;">Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
    <a href="https://timecheck.netlify.app/Verificacion/codigo=${randomNumber}" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Verificar cuenta</a>
    <p style="color:#000;font-size:14px;">Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte a través este enlace: </p>
    <a href="https://timecheck.netlify.app/ContactUs" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Información de contacto de soporte</a>
    <p style="color:#000;font-size:14px;">¡Esperamos verte pronto en TimeCheck y que disfrutes de una experiencia fluida y eficiente en la gestión de tus eventos!</p>
    <p style="color:#000;font-size:14px;">Atentamente</p>
    <p style="color:#000;font-size:14px;">El equipo de TimeCheck</p>
    `;
  }
};

export { sendEmail, getTemplate };
