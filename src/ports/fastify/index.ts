import server from "@/config/server";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { app } from "./server";
import { SwaggerTheme } from "swagger-themes";
import { userRoutes } from "./modules/user";
import { authRoutes } from "./modules/auth";
import { organizationRoutes } from "./modules/organization";
import { companieRoutes } from "./modules/companie";
import { groupCompanyRoutes } from "./modules/group-company";
import { Sentry } from "./sentry";
import { serviceRoutes } from "./modules/service";

const theme = new SwaggerTheme("v3");
const content = theme.getBuffer("dark");

const { port, baseUrl } = server as { port: number; baseUrl: string };

app.register(cors, {
  origin: '*',
});

const swaggerOptions = {
  swagger: {
    info: {
      title: "MS AUTH API",
      description: "MS AUTH API Documentation",
      version: "1.0.0"
    },
    host: baseUrl,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      Authorization: {
        type: "apiKey",
        name: "authorization",
        in: "header",
        description: "Authentication token"
      }
    },
    security: [
      {
        Authorization: []
      }
    ]
  }
} as any;

const swaggerUiOptions = {
  routePrefix: "/api-docs/:key",
  exposeRoute: false,
  theme: {
    css: [{ filename: "theme.css", content: content }]
  }
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.addHook("preHandler", (request, reply, done) => {
  if (request.url.startsWith("/api-docs/")) {
    const params = request.params as { key: string };
    const key = params.key;
    if (key === process.env["API_KEY_DOCS"]!) {
      done();
    } else {
      reply.code(403).send({ message: "Unauthorized" });
    }
  } else {
    done();
  }
});

app.register(authRoutes);
app.register(userRoutes);
app.register(organizationRoutes);
app.register(companieRoutes);
app.register(serviceRoutes);
app.register(groupCompanyRoutes);

app.head(
  "/",
  {
    schema: {
      description: "Root endpoint",
      tags: ["Api"],
      response: {
        200: {
          description: "Succesful response",
          type: "object",
          properties: {
            message: { type: "string" },
            result: { type: "object", nullable: true }
          }
        }
      }
    }
  },
  async (_req, reply) => {
    reply.status(200).send({ server: "online" });
  }
);

app.setErrorHandler((error, _request, reply) => {
  Sentry.captureException(error);

  reply.send(error);
});



export async function start() {
  try {
    app.listen({ port });
    console.log(`Server is listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

export { app };
