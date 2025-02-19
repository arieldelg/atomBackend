import { GetAllTasks } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseGetTaskImp {
  execute(uid: string): Promise<GetAllTasks>;
}
export class UseCaseGetTasks implements UseCaseGetTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(uid: string): Promise<GetAllTasks> {
    return this.taskRepository.getTasks(uid);
  }
}
