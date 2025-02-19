import { AddTask, Task } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseAddTaskImp {
  execute(task: Task): Promise<AddTask>;
}

export class UseCaseAddTask implements UseCaseAddTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(task: Task): Promise<AddTask> {
    return this.taskRepository.addTask(task);
  }
}
