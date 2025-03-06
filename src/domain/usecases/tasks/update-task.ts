import { WriteResult } from "firebase-admin/firestore";
import { UpdateTaskKeys } from "../../../types";
import { TaskRepository } from "../../repository/task.reporitory";

interface UseCaseUpdateTaskImp {
  execute(idTask: string, update: UpdateTaskKeys): Promise<WriteResult>;
}

export class UseCaseUpdateTask implements UseCaseUpdateTaskImp {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(idTask: string, update: UpdateTaskKeys): Promise<WriteResult> {
    return this.taskRepository.updateTask(idTask, update);
  }
}
