import fastify, { FastifyInstance } from "fastify";
import http from "http";
import { JWTPayload } from "../adapters/jwt";

type CustomRequest = http.IncomingMessage & {
  user: JWTPayload;
};

export type FastifyInstanceType = FastifyInstance<http.Server, CustomRequest>;

export const app = fastify<http.Server, CustomRequest>({ logger: false });
