import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env/index.js";
import { transactionsRoutes } from "./routes/transactions.js";

const app = fastify();

app.register(cookie);

app.addHook("preHandler", async (request) => {
  console.log(`globalHook [${request.method}] ${request.url}`);
});

app.register(transactionsRoutes, {
  prefix: "/transactions",
});

app
  .listen({
    port: env.PORT,
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  });

// #example of httpie
// http GET http://localhost:3333
