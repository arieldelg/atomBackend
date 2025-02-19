import {
  AddTask,
  GetAllTasks,
  ResponseHTTP,
  Task,
  UpdateTask,
  UpdateTaskKeys,
} from "../../types";

export abstract class TaskRepository {
  abstract addTask(task: Task): Promise<AddTask>;
  abstract getTasks(uid: string): Promise<GetAllTasks>;
  abstract updateTask(
    idTask: string,
    update: UpdateTaskKeys
  ): Promise<UpdateTask>;
  abstract deleteTask(idTask: string): Promise<ResponseHTTP>;
}
