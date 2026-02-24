import fastify from "fastify";
import { knex } from "./database.js";
import { env } from "./env/index.js";

const app = fastify();

app.get("/", async (request, reply) => {
  const transaction = await knex("transactions").insert({
    id: crypto.randomUUID(),
    title: "New transaction",
    amount: 500,
  });

  const transactions = await knex("transactions").select("*");

  return { transactions };
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
