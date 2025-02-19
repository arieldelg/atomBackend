import { ResponseHTTP } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseDeleteTaskImp {
  execute(uid: string): Promise<ResponseHTTP>;
}
export class UseCaseDeleteTask implements UseCaseDeleteTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(uid: string): Promise<ResponseHTTP> {
    return this.taskRepository.deleteTask(uid);
  }
}
