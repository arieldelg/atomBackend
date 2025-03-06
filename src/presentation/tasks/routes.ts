import { Router } from "express";
import { TaskControllers } from "./controllers";
import { TaskDataSourceImp, TaskRepositoryImp } from "../../infrestructure";
import { TaskDtos } from "../../domain";

export class TaskRoutes {
  static get routes() {
    const router = Router();

    const taskDataSource = new TaskDataSourceImp();
    const taskRepository = new TaskRepositoryImp(taskDataSource);
    const taskControllers = new TaskControllers(taskRepository);

    router.use(TaskDtos.verifyHeader);

    router.get("/", taskControllers.getTasks);
    router.post("/", TaskDtos.verifyDataTaskCreation, taskControllers.addTask);

    router.put(
      "/:id",
      TaskDtos.verifyDataTaskUpdate,
      taskControllers.updateTask
    );
    router.delete("/:id", taskControllers.deleteTask);

    return router;
  }
}
