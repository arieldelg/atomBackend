import { db } from "../../config/firebase";
import { CustomErrors, TaskDataSource } from "../../domain";
import { TaskEntity } from "../../domain/entities/task.entity";
import {
  Task,
  AddTask,
  GetAllTasks,
  UpdateTask,
  UpdateTaskKeys,
  ResponseHTTP,
} from "../../types";

export class TaskDataSourceImp implements TaskDataSource {
  addTask(task: Task): Promise<AddTask> {
    try {
      const docRef = db.collection("tasks").doc();
      docRef.set({
        ...task,
        id: docRef.id,
      });

      const taskEntity = new TaskEntity(task);

      return Promise.resolve({
        ok: true,
        data: taskEntity,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server " + error);
    }
  }

  async getTasks(uid: string): Promise<GetAllTasks> {
    try {
      const snapshot = await db.collection("tasks")
        .where("uid", "==", uid)
        .get();

      const documents = snapshot.docs.map((doc) => {
        return new TaskEntity({
          title: doc.data().title,
          completed: doc.data().completed,
          createdAt: doc.data().createdAt,
          description: doc.data().description,
          updatedAt: doc.data().updatedAt,
          id: doc.id,
          uid: doc.data().uid,
          pending: doc.data().pending
        });
      });

      return Promise.resolve({
        ok: true,
        data: documents,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server " + error);
    }
  }

  updateTask(idTask: string, update: UpdateTaskKeys): Promise<UpdateTask> {
    const updatedDoc = {
      ...update,
      updatedAt: new Date(),
    };
    try {
      db.collection("tasks")
        .doc(idTask)
        .update(updatedDoc as { [key: string]: any });

      return Promise.resolve({
        ok: true,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server " + error);
    }
  }

  deleteTask(idTask: string): Promise<ResponseHTTP> {
    try {
      db.collection("tasks").doc(idTask).delete();

      return Promise.resolve({
        ok: true,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server " + error);
    }
  }
}
