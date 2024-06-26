import { app as fastify } from "../../ports/adapters/http/server";
fastify.ready().then(() => {});
const app = fastify.server;

export { app, fastify };
