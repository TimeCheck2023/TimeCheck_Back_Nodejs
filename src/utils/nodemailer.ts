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

const getTemplate = (name: string, randomNumber: string, device?: string) => {
  return `
    <h1 style="color:#000;font-size:20px;">¡Estimado ${name}!</h1>
    <p style="color:#000;font-size:14px;">Gracias por registrarte en El aplicativo TimeCheck! Para completar el proceso de registro y asegurarnos de que tu dirección de correo electrónico sea válida, necesitamos que verifiques tu cuenta.</p>
    <p style="color:#000;font-size:14px;">verificar el gmail desde la movil, ingresa este codigo: <span style="display:color:#000;font-size:16px;padding:10px 20px;text-decoration:none;"">${randomNumber}</span></p>
    <p style="color:#000;font-size:14px;">verificar el gmail desde la web, haz clic en el siguiente enlace:</p>
    <a href="https://timecheck.netlify.app/Verificacion/codigo=${randomNumber}" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Verificar cuenta</a>
    <p style="color:#000;font-size:14px;">Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte a través este enlace: </p>
    <a href="https://timecheck.netlify.app/ContactUs" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Información de contacto</a>
    <p style="color:#000;font-size:14px;">¡Esperamos verte pronto en TimeCheck y que disfrutes de una experiencia fluida y eficiente en la gestión de tus eventos!</p>
    <p style="color:#000;font-size:14px;">Atentamente</p>
    <p style="color:#000;font-size:14px;">El equipo de TimeCheck</p>
  `;
};

const getTemplateEmail = (email: string, randomNumber: string) => {
  return `
    <h1 style="color:#000;font-size:20px;">¡Estimado ${email}!</h1>
    <p style="color:#000;font-size:14px;">Para proceder con el restablecimiento de su contraseña, le proporcionamos un código de recuperación único. Este código es una medida de seguridad adicional para garantizar la protección de su cuenta. A continuación, encontrará el código de recuperación:</p>
    <p style="color:#000;font-size:14px;">Código de recuperación: <span style="display:color:#000;font-size:16px;padding:10px 20px;text-decoration:none;"">${randomNumber}</span></p>
    <p style="color:#000;font-size:14px;">Agradecemos su atención y comprensión en este asunto. Si tiene alguna pregunta o necesita ayuda adicional,, no dudes en ponerte en contacto con nuestro equipo de soporte a través este enlace: </p>
    <a href="https://timecheck.netlify.app/ContactUs" target="_blank" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;padding:10px 20px;text-decoration:none;">Información de contacto</a>
    <p style="color:#000;font-size:14px;">Atentamente</p>
    <p style="color:#000;font-size:14px;">El equipo de TimeCheck</p>
  `;
};

export { sendEmail, getTemplate, getTemplateEmail };
