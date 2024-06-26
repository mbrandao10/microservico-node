import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import fastify from "fastify";

const sentry = fastify();

Sentry.init({
  dsn: process.env["SENTRY_DSN"],
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration()
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0
});

export { sentry, Sentry };
