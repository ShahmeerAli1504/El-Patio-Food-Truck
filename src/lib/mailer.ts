import nodemailer, { type Transporter } from "nodemailer";

/**
 * Gmail SMTP mailer.
 * Needs GMAIL_USER (the Gmail address) and GMAIL_APP_PASSWORD (a 16-character Google App Password,
 * NOT the normal Gmail password — Google Account → Security → 2-Step Verification → App passwords).
 */
let transporter: Transporter | null = null;

export const mailerConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

export function getMailer() {
  if (!mailerConfigured()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, ""), // Google shows it with spaces
      },
    });
  }
  return transporter;
}

/** "El Patio Website <you@gmail.com>" — Gmail requires sending from the signed-in address. */
export const fromAddress = (name = process.env.MAIL_FROM_NAME || "El Patio Website") =>
  `"${name.replace(/"/g, "")}" <${process.env.GMAIL_USER}>`;
