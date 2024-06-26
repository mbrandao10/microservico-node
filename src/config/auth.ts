export default {
  secret: process.env["JWT_SECRET"] || "mysecret",
  expiresIn: process.env["JWT_EXPIRES_TOKEN"]|| "1d",
  refreshExpiresIn: process.env["JWT_REFRESH_EXPIRES_TOKEN"] || "1d",
  refreshSecret: process.env["JWT_REFRESH_SECRET"] || "myanothersecret",
  salt: process.env["SALT"] || "salt",
};
