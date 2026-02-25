import type { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";

export function transactionsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    console.log(`transactionsRoutes [${request.method}] ${request.url}`);
  });

  app.post("/", async (request, reply) => {
    const createTransactionBody = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBody.parse(req.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      session_id: sessionId,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions")
      .where("session_id", sessionId)
      .select();

    return { transactions };
  });

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParams = z.object({
      id: z.string(),
    });
    const { sessionId } = request.cookies;

    const { id } = getTransactionParams.parse(request.params);
    const transaction = await knex("transactions")
      .where("session_id", sessionId)
      .where("id", id)
      .first();

    return { transaction };
  });

  app.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first();

      return { summary };
    },
  );
}
