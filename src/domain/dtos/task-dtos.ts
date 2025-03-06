import { NextFunction, Request, Response } from "express";
import { CustomErrors } from "../errors/custom-errors";
import { taskMap } from "../../types";
import { CreationTaskKeys } from "../../types/task.types";
import { auth } from "../../config/firebase";

export class TaskDtos {
  public static readonly verifyHeader = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).send(CustomErrors.UnAuthorized("UnAuthorized"));
      return;
    }

    const [_Bearer, token] = authHeader.split(" ");
    try {
      const resp = await auth.verifyIdToken(token);
      if (!resp) {
        res.status(401).send(CustomErrors.UnAuthorized("User UnAuthorized"));
      }
      Object.assign(req.body, { uid: resp.uid });
      next();
    } catch (error) {
      if (error instanceof CustomErrors) throw error;
      res
        .status(500)
        .send(
          CustomErrors.internalErrorServer("Internal Error Server " + error)
        );
    }
  };

  public static readonly verifyDataTaskCreation = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!this.checkLength(req.body)) {
      res.status(400).send(CustomErrors.badRequest("Missing Property"));
      return;
    }

    req.body = this.filterAuthorizedValues(req.body);

    const resp = this.checkPermitValuesCreation(req.body);

    if (!resp.ok) {
      res.status(400).send(CustomErrors.badRequest(resp?.message));
      return;
    }

    next();
  };

  public static readonly verifyDataTaskUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const task = req.body;
    if (!this.checkLength(task)) {
      res.status(400).send(CustomErrors.badRequest("Missing Property"));
      return;
    }

    req.body = this.filterAuthorizedValues(task);

    const resp = this.checkPermitValuesUpdated(req.body);

    if (!resp.ok) {
      res.status(400).send(CustomErrors.badRequest(resp?.message));
      return;
    }

    next();
  };

  private static readonly checkLength = (task: Record<string, string>) => {
    if (Object.keys(task).length === 0) {
      return false;
    }
    return true;
  };

  private static checkPermitValuesCreation(task: Record<string, string>) {
    for (const keys of Object.keys(taskMap)) {
      const key = keys as CreationTaskKeys;
      if (task[key] === undefined) {
        return {
          ok: false,
          message: `property ${key} is missing`,
        };
      }
      if (typeof task[key] !== taskMap[key] || task[key].length === 0) {
        return {
          ok: false,
          message: `${key}: value property is invalid`,
        };
      }
    }

    return {
      ok: true,
      message: "Everything looks good",
    };
  }

  private static checkPermitValuesUpdated(task: Record<string, string>) {
    for (const key of Object.keys(task)) {
      if (
        typeof task[key] !== taskMap[key as CreationTaskKeys] ||
        task[key].length === 0
      ) {
        return {
          ok: false,
          message: `${key}: value property is invalid`,
        };
      }
    }

    return {
      ok: true,
      message: "Everything looks good",
    };
  }

  private static filterAuthorizedValues(task: Record<string, string>) {
    const filterObject = {};
    for (const key of Object.keys(task)) {
      if (key in taskMap) {
        Object.assign(filterObject, { [key]: task[key] });
      }
    }

    return filterObject;
  }
}
