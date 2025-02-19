import { Router } from "express";
import { UserRoutes } from "./user/router";
import { TaskRoutes } from "./tasks/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();
    router.use("/user", UserRoutes.routes);
    router.use("/tasks", TaskRoutes.routes);
    return router;
  }
}
