import { Request, Response } from "express";
import { UserRepository, CreateUser, GetUser } from "../../domain";

export class UserControllers {
  constructor(private readonly appRepository: UserRepository) {}
  public addUser = (req: Request, res: Response) => {
    const { email, password, displayName } = req.body;

    new CreateUser(this.appRepository)
      .execute({ email, password, displayName })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  };

  public getUser = (req: Request, res: Response) => {
    const { email, password } = req.params;

    new GetUser(this.appRepository)
      .execute({ email, password })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err));
  };
}
