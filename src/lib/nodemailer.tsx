import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
});

export const sendWelcomeEmail = async (name: string, to: string) => {
  const emailHtml = await render(<WelcomeEmail name={name} />);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Bem-vindo ao meu cérebro 🧠 ',
    html: emailHtml,
  });
};
