import { Request, Response } from "express";
import {
  CustomErrors,
  TaskRepository,
  UseCaseAddTask,
  UseCaseDeleteTask,
  UseCaseGetTasks,
  UseCaseUpdateTask,
} from "../../domain";

export class TaskControllers {
  constructor(private readonly taskRepository: TaskRepository) {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomErrors) {
      return res
        .status(error.statusCode)
        .send({ statusCode: error.statusCode, message: error.message });
    }

    return res.status(500).send({ error: "Internal Error Server " + error });
  }

  public addTask = (req: Request, res: Response) => {
    const { uid } = req.body;
    const task = {
      ...req.body,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      uid,
    };
    new UseCaseAddTask(this.taskRepository)
      .execute(task)
      .then((data) => res.status(200).send(data))
      .catch((err) => this.handleErrors(err, res));
  };

  public getTasks = (req: Request, res: Response) => {
    const { uid } = req.body;
    new UseCaseGetTasks(this.taskRepository)
      .execute(uid)
      .then((data) => res.status(200).send(data))
      .catch((err) => this.handleErrors(err, res));
  };

  public updateTask = (req: Request, res: Response) => {
    new UseCaseUpdateTask(this.taskRepository)
      .execute(req.params.id, req.body)
      .then((data) => res.status(200).send(data))
      .catch((err) =>
        res
          .status(500)
          .send(CustomErrors.internalErrorServer("Error: ", err.code))
      );
  };

  public deleteTask = (req: Request, res: Response) => {
    new UseCaseDeleteTask(this.taskRepository)
      .execute(req.params.id)
      .then((data) => res.status(200).send(data))
      .catch((err) => this.handleErrors(err, res));
  };
}
