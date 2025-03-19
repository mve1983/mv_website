import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) return false;

  const secureValue = process.env.EMAIL_SECURE === 'false' ? false : true;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: secureValue,
    auth: {
      user: process.env.EMAIL_USER_LOGIN_NAME,
      pass: process.env.EMAIL_USER_LOGIN_PW,
    },
  });

  async function sendMail() {
    await transporter.sendMail({
      from: process.env.EMAIL_USER_LOGIN_EMAIL,
      to: process.env.EMAIL_USER_LOGIN_EMAIL,
      subject: `Message from Website - ${body.subject}`,
      text: `from: ${body.name}, e-mail: ${body.email}, message: ${body.message}`,
      html: `<h4>from: ${body.name}</h4> <h4>e-mail: ${body.email}</h4> <p>${body.message}</p>`,
    });
  }

  let sendMailStatus = true;

  sendMail().catch((e) => {
    console.log(e);
    sendMailStatus = false;
  });

  return sendMailStatus;
});