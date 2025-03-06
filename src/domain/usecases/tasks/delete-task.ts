import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseDeleteTaskImp {
  execute(uid: string): Promise<{ ok: boolean; message: string }>;
}
export class UseCaseDeleteTask implements UseCaseDeleteTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(uid: string): Promise<{ ok: boolean; message: string }> {
    return this.taskRepository.deleteTask(uid);
  }
}
