import { NextFunction, Request, Response } from "express";
import { CustomErrors } from "../errors/custom-errors";
import { CreationTaskKeys } from "../../types";

export class TaskDtos {
  public static readonly verifyHeader = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const headerId = req.header("uid")

    if (!headerId) {
      res.status(401).send(CustomErrors.UnAuthorized("UnAuthorized"))
      return 
    }


    next()
  };


  public static readonly verifyDataCreationTask = (req: Request, res: Response, next: NextFunction) => {
    const task = req.body
    if(!this.checkIfValueExist(task)) {
      res.status(400).send(CustomErrors.badRequest("missing property"))
      return
    }
    next()
  }

  private static checkIfValueExist(object: Record<CreationTaskKeys, string>){
      if(object.completed === undefined || object.description === undefined || object.title === undefined) return false
      return true
  }
}
