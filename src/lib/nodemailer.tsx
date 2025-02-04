import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendWelcomeEmail = async (name: string, to: string) => {
  const emailHtml = await render(<WelcomeEmail name={name} />);

  await transporter.sendMail({
    from: process.env.USER,
    to,
    subject: 'Bem-vindo ao nosso Blog! 🚀',
    html: emailHtml,
  });
};
