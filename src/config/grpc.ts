export default {
  url:
    `${process.env["URL_GRPC"]}:${process.env["PORT_GRPC"]}` ??
    "localhost:50051",
  port: process.env["PORT_GRPC"] ?? 50051,
  urlUtilMs: process.env["URL_MS_UTIL_GRPC"] ?? "localhost:50054",
};
