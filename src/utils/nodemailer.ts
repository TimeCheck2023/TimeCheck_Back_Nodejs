import nodemailer from "nodemailer";

const mail = {
  user: "timecheckenterprise@gmail.com",
  pass: "ngkacpoowyotegfx",
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

const getTemplate = (name: string) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `
  ¡Hola ${name}!
  
  Gracias por registrarte en nuestra aplicación de eventos. Para verificar tu cuenta, haz clic en el siguiente enlace:
  
  <a href="https://tudominio.com/verificar?codigo=${randomNumber}">Verificar cuenta</a>
  
  Si no puedes hacer clic en el enlace, cópialo y pégalo en la barra de direcciones de tu navegador.
  
  ¡Disfruta de nuestros eventos!
`;
};

export { sendEmail, getTemplate };
