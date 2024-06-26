import nodemailer from "nodemailer";
import configMail from "@/config/credentials-send";

export const transporter = nodemailer.createTransport({
  host: configMail.hostEmail,
  port: Number(configMail.portEmail),
  auth: {
    user: configMail.authUserEmail,
    pass: configMail.authPassEmail
  }
});
