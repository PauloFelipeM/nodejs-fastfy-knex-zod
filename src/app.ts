import fastify from "fastify";
import cookie from "@fastify/cookie";
import { transactionsRoutes } from "./routes/transactions.js";

export const app = fastify();

app.register(cookie);

app.addHook("preHandler", async (request) => {
  console.log(`globalHook [${request.method}] ${request.url}`);
});

app.register(transactionsRoutes, {
  prefix: "/transactions",
});