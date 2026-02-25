import { app } from "./app";
import { env } from "./env/index";

app
  .listen({
    port: env.PORT,
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  });

// #example of httpie
// http GET http://localhost:3333
