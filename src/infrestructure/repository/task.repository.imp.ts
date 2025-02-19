import { TaskDataSource, TaskRepository } from "../../domain";
import {
  Task,
  AddTask,
  GetAllTasks,
  UpdateTask,
  UpdateTaskKeys,
  ResponseHTTP,
} from "../../types";

export class TaskRepositoryImp implements TaskRepository {
  constructor(private readonly taskDatasource: TaskDataSource) {}
  addTask(task: Task): Promise<AddTask> {
    return this.taskDatasource.addTask(task);
  }
  getTasks(uid: string): Promise<GetAllTasks> {
    return this.taskDatasource.getTasks(uid);
  }
  updateTask(idTask: string, update: UpdateTaskKeys): Promise<UpdateTask> {
    return this.taskDatasource.updateTask(idTask, update);
  }
  deleteTask(idTask: string): Promise<ResponseHTTP> {
    return this.taskDatasource.deleteTask(idTask);
  }
}
