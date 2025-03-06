import { onRequest } from "firebase-functions/v2/https";
import { Server } from "./presentation/server";
import express from "express";
import { AppRoutes } from "./presentation/router";

(() => {
  app();
})();

function app() {
  const app = express();

  const server = new Server({ app, routes: AppRoutes.routes });
  server.startServer();

  exports.app = onRequest(app);
}
