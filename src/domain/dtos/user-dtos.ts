import { NextFunction, Request, Response } from "express";
import { auth } from "../../config/firebase";
import { CustomErrors } from "../errors/custom-errors";

export class UserDtos {
  private static readonly verifyEmail = (email: string, res: Response) => {
    const rex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const trimmedEmail = email.trim()
    if (!rex.test(trimmedEmail)) {
      res.status(400).send({
        ok: false,
        message: "Email is not valid",
      });
      return;
    }

    return true;
  };

  public static readonly verifyUserAndEmailExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body as { email: string};
    const trimmedEmail = email.trim()
    this.verifyEmail(trimmedEmail, res);

    try {
      await auth.getUserByEmail(trimmedEmail);
      res.status(400).send({
        ok: false,
        message: "Email exist, please login",
      });
    } catch (error) {
      if ((error as any).errorInfo.code === "auth/user-not-found") {
        return next();
      }
      throw CustomErrors.internalErrorServer(
        "Internal Error Server/user-dtos.ts " + error
      );
    }
  };

  public static readonly verifyEmailDoesNotExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.params;
    const trimmedEmail = email.trim()
    this.verifyEmail(trimmedEmail, res);
  
    try {
      await auth.getUserByEmail(trimmedEmail);
      next();
    } catch (error) {
      if ((error as any).errorInfo.code === "auth/user-not-found") {
        res.status(401).send(CustomErrors.UnAuthorized("Email not Exist, please register"));
        return;
      }
      throw CustomErrors.internalErrorServer(
        "Internal Error Server/user-dtos.ts " + error
      );
    }
  };
}
