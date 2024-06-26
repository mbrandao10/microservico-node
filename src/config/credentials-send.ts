export default {
  hostEmail: process.env["HOST_EMAIL"] || "mysecret",
  portEmail: process.env["PORT_EMAIL"] || 0,
  secureEmail: process.env["SECURE_EMAIL"] || false,
  authUserEmail: process.env["AUTH_USER_EMAIL"] || "mysecret",
  authPassEmail: process.env["AUTH_PASS_EMAIL"] || "mysecret"
};
