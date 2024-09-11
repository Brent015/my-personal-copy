import restify from "restify";

import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

import { env, services } from "@repo/shared";

const server = restify.createServer({});

server.use(restify.plugins.bodyParser());

server.get("/users", async (req, res) => {
  try {
    const users = await services.user.getUsers();
    res.send(users);
  } catch (error) {
    res.send(500, { error: "An error occurred while fetching users" });
  }
});

// Start the server
server.listen(env.PORT, () => {
  console.log("%s listening at %s", server.name, server.url);
});
