import express, { Request, Response, Express, Router } from "express";
import cors from "cors";

interface ServerOptions {
  app: Express;
  routes: Router;
}

export class Server {
  private readonly app: Express;
  private readonly routes: Router;
  constructor({ app, routes }: ServerOptions) {
    this.app = app;
    this.routes = routes;
  }
  startServer() {
    this.app.use(cors({ origin: true }));
    this.app.use(express.json());

    this.app.get("/hello", (_req: Request, res: Response) => {
      res.status(200).json({
        message: "hello world",
      });
    });

    this.app.use(this.routes);
    // this.app.post("/users", UserControllers.addUser);
  }
}
