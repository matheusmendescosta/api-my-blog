import { SendPostEmail } from '@/emails/SendPostEmail';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    : undefined,
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
} as nodemailer.TransportOptions);

export const sendWelcomeEmail = async (name: string, to: string) => {
  const emailHtml = await render(<WelcomeEmail name={name} />);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Bem-vindo ao meu cérebro 🧠 ',
    html: emailHtml,
  });
};

export const SendPost = async (to: string, postId: string, postTitle: string) => {
  const emailHtml = await render(<SendPostEmail postId={postId} postTitle={postTitle} />);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Entregamos o seu artigo! Veja aqui 🧠',
    html: emailHtml,
  });
};
