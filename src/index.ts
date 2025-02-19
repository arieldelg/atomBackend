// import {onRequest} from "firebase-functions/v2/https";
// import express, { Request, Response } from "express"
// import cors from "cors"
// import { UserControllers } from "./usersControllers";
import { onRequest } from "firebase-functions/v2/https";
import { Server } from "./presentation/server";
import express from "express";
import { AppRoutes } from "./presentation/router";
// const app = express()
// app.use(cors({origin: true}))
// app.use(express.json())

// app.get("/hello" , (_req: Request, res: Response) => {

//     res.status(200).json({
//         message: 'hello world'
//     })
// })

// app.post('/users', UserControllers.addUser)

// exports.app = onRequest(app)
(() => {
  app();
})();

function app() {
  const app = express();

  const server = new Server({ app, routes: AppRoutes.routes });
  server.startServer();

  exports.app = onRequest(app);
}
