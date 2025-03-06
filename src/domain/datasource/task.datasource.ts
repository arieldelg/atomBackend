import { WriteResult } from "firebase-admin/firestore";
import { Task, UpdateTaskKeys } from "../../types";

export abstract class TaskDataSource {
  abstract addTask(task: Task): Promise<WriteResult>;
  abstract getTasks(uid: string): Promise<Task[]>;
  abstract updateTask(
    idTask: string,
    update: UpdateTaskKeys
  ): Promise<WriteResult>;
  abstract deleteTask(
    idTask: string
  ): Promise<{ ok: boolean; message: string }>;
}
