import { transporter } from ".";

import configMail from "@/config/credentials-send";

type SendMail = (to: string, subject: string, html: string) => Promise<void>;

export const sendMail: SendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: configMail.hostEmail,
    to,
    subject,
    html
  });
};
