import { UpdateTask, UpdateTaskKeys } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseUpdateTaskImp {
  execute(idTask: string, update: UpdateTaskKeys): Promise<UpdateTask>;
}

export class UseCaseUpdateTask implements UseCaseUpdateTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(idTask: string, update: UpdateTaskKeys): Promise<UpdateTask> {
    return this.taskRepository.updateTask(idTask, update);
  }
}
