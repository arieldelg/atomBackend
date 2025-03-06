import { WriteResult } from "firebase-admin/firestore";
import { Task } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseAddTaskImp {
  execute(task: Task): Promise<WriteResult>;
}

export class UseCaseAddTask implements UseCaseAddTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(task: Task): Promise<WriteResult> {
    return this.taskRepository.addTask(task);
  }
}
