import { WriteResult } from "firebase-admin/firestore";
import { TaskDataSource, TaskRepository } from "../../domain";
import { Task, UpdateTaskKeys } from "../../types";

export class TaskRepositoryImp implements TaskRepository {
  constructor(private readonly taskDatasource: TaskDataSource) {}
  addTask(task: Task): Promise<WriteResult> {
    return this.taskDatasource.addTask(task);
  }
  getTasks(uid: string): Promise<Task[]> {
    return this.taskDatasource.getTasks(uid);
  }
  updateTask(idTask: string, update: UpdateTaskKeys): Promise<WriteResult> {
    return this.taskDatasource.updateTask(idTask, update);
  }
  deleteTask(idTask: string): Promise<{ ok: boolean; message: string }> {
    return this.taskDatasource.deleteTask(idTask);
  }
}
