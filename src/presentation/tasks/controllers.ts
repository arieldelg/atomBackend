import { Request, Response } from "express";
import {
  TaskRepository,
  UseCaseAddTask,
  UseCaseDeleteTask,
  UseCaseGetTasks,
  UseCaseUpdateTask,
} from "../../domain";

export class TaskControllers {
  constructor(private readonly taskRepository: TaskRepository) {}

  public addTask = (req: Request, res: Response) => {
    const {
      title,
      description,
      completed = false,
      pending = false,
      createdAt = new Date().toUTCString(),
      updatedAt = new Date().toUTCString(),
    } = req.body;
    const uid = req.header("uid")!;
   
    new UseCaseAddTask(this.taskRepository)
      .execute({ title, description, completed, createdAt, updatedAt, uid, pending })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  };

  public getTasks = (req: Request, res: Response) => {
    const uid = req.header("uid")!;
    
    new UseCaseGetTasks(this.taskRepository)
      .execute(uid)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  };

  public updateTask = (req: Request, res: Response) => {
    new UseCaseUpdateTask(this.taskRepository)
      .execute(req.params.id, req.body)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  };

  public deleteTask = (req: Request, res: Response) => {
    new UseCaseDeleteTask(this.taskRepository)
      .execute(req.params.id)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  };
}
