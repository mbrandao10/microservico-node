import { send } from "../mail";

export const sendConfirmationMail = async (to: string, token: string) => {
  const html = `<a href="${process.env["APP_URL"]}/confirm/${token}">Confirm your email</a>`;
  await send.sendMail(to, "Confirm your email", html);
};

export const sendResetPasswordMail = async ( data: {to: string, link: string}) => {
  const html = `<a href="${data.link}">Reset your password</a>`;
  await send.sendMail(data.to, "Reset your password", html);
};
