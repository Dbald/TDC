import express from "express";
import { registerRoutes } from "./routes";

const app = express();

(async () => {
  const server = await registerRoutes(app);

  const PORT = Number(process.env.PORT) || 8080;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[api] listening on: ${PORT}`);
  });
})();
