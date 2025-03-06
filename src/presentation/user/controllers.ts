import { Request, Response } from "express";
import {
  UserRepository,
  CreateUser,
  GetUser,
  CustomErrors,
} from "../../domain";
import { VerifyUser } from "../../domain/usecases/users/verify-user";

export class UserControllers {
  constructor(private readonly appRepository: UserRepository) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomErrors) {
      return res.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
        ok: false,
      });
    }

    return res
      .status(500)
      .send({ statusCode: 500, message: "Internal Error Server" });
  }

  /**
   * funcion para crear usuario y guardarlo en firebase admin
   * @param req
   * @param res
   * @deprecated usar firebase auth del lado del cliente
   */
  public addUser = (req: Request, res: Response) => {
    const { email, password, displayName } = req.body;
    new CreateUser(this.appRepository)
      .execute({ email, password, displayName })
      .then((data) => res.status(200).send(data))
      .catch((err) => this.handleError(err, res));
  };

  public getUser = (req: Request, res: Response) => {
    const { email } = req.params;
    new GetUser(this.appRepository)
      .execute({ email })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };

  public emailExist = (req: Request, res: Response) => {
    const { email } = req.params;
    new VerifyUser(this.appRepository)
      .execute({ email })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };
}
