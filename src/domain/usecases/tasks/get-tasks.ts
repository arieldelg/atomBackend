import { TaskRepository } from "../../repository/task.reporitory";
import { Task } from "../../../types";

interface UseCaseGetTaskImp {
  execute(uid: string): Promise<Task[]>;
}
export class UseCaseGetTasks implements UseCaseGetTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(uid: string): Promise<Task[]> {
    return this.taskRepository.getTasks(uid);
  }
}
