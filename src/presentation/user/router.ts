import { Router } from "express";
import { UserControllers } from "./controllers";
import { UserDataSourceImp, UserRepositoryImp } from "../../infrestructure";
import { UserDtos } from "../../domain/dtos/user-dtos";

export class UserRoutes {
  static get routes() {
    const router = Router();
    const appDatasource = new UserDataSourceImp();
    const appRepository = new UserRepositoryImp(appDatasource);
    const userControllers = new UserControllers(appRepository);

    router.get(
      "/:email",
      UserDtos.verifyEmailDoesNotExist,
      userControllers.getUser
    );
    router.post("/", UserDtos.verifyUserAndEmailExist, userControllers.addUser);

    return router;
  }
}
