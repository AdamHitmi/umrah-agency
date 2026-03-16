import nodemailer from "nodemailer";

type ContactNotificationInput = {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type BookingNotificationInput = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  roomType: string;
  travelersCount: number;
  notes: string | null;
  packageTitle: string;
  packageDateRange: string;
};

type MailTransportConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

let transporter: nodemailer.Transporter | null = null;
let configWarningShown = false;

function getMailTransportConfig(): MailTransportConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.NOTIFICATION_EMAIL_TO || "hitmiadam96@gmail.com";

  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to
  };
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const config = getMailTransportConfig();

  if (!config) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  return transporter;
}

function warnIfMailIsNotConfigured() {
  if (configWarningShown) {
    return;
  }

  configWarningShown = true;
  console.warn(
    "Email notifications are disabled because SMTP settings are missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM."
  );
}

async function sendEmail(args: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const config = getMailTransportConfig();
  const mailer = getTransporter();

  if (!config || !mailer) {
    warnIfMailIsNotConfigured();
    return;
  }

  await mailer.sendMail({
    from: config.from,
    to: config.to,
    replyTo: args.replyTo,
    subject: args.subject,
    text: args.text,
    html: args.html
  });
}

function renderField(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e5d3a1;font-weight:700;background:#faf3df;">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e5d3a1;background:#fffaf0;">${value}</td>
  </tr>`;
}

export async function sendContactNotification(input: ContactNotificationInput) {
  const subject = `New contact submission from ${input.fullName}`;
  const text = [
    "New contact submission",
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Message: ${input.message}`
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#0b0907;padding:24px;color:#f7f1e8;">
      <h1 style="margin:0 0 16px;color:#efd99e;">New contact submission</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        ${renderField("Name", input.fullName)}
        ${renderField("Phone", input.phone)}
        ${renderField("Email", input.email)}
        ${renderField("Subject", input.subject)}
        ${renderField("Message", input.message)}
      </table>
    </div>
  `;

  await sendEmail({subject, text, html, replyTo: input.email});
}

export async function sendBookingNotification(input: BookingNotificationInput) {
  const subject = `New booking request for ${input.packageTitle}`;
  const text = [
    "New booking request",
    `Package: ${input.packageTitle}`,
    `Travel dates: ${input.packageDateRange}`,
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `City: ${input.city}`,
    `Room type: ${input.roomType}`,
    `Travelers: ${input.travelersCount}`,
    `Notes: ${input.notes || "-"}`
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#0b0907;padding:24px;color:#f7f1e8;">
      <h1 style="margin:0 0 16px;color:#efd99e;">New booking request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        ${renderField("Package", input.packageTitle)}
        ${renderField("Travel dates", input.packageDateRange)}
        ${renderField("Name", input.fullName)}
        ${renderField("Phone", input.phone)}
        ${renderField("Email", input.email)}
        ${renderField("City", input.city)}
        ${renderField("Room type", input.roomType)}
        ${renderField("Travelers", String(input.travelersCount))}
        ${renderField("Notes", input.notes || "-")}
      </table>
    </div>
  `;

  await sendEmail({subject, text, html, replyTo: input.email});
}
