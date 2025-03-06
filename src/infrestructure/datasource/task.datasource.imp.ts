import { db, WriteResult } from "../../config/firebase";
import { CustomErrors, TaskDataSource } from "../../domain";
import { Task, UpdateTaskKeys } from "../../types";

export class TaskDataSourceImp implements TaskDataSource {
  addTask(task: Task): Promise<WriteResult> {
    try {
      const docRef = db.collection("tasks").doc();
      return docRef.set({
        ...task,
        id: docRef.id,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server " + error);
    }
  }

  async getTasks(uid: string): Promise<Task[]> {
    const snapshot = await db.collection("tasks").where("uid", "==", uid).get();
    return (
      snapshot.docs.map((doc) => ({
        title: doc.data().title,
        completed: doc.data().completed,
        createdAt: doc.data().createdAt,
        description: doc.data().description,
        updatedAt: doc.data().updatedAt,
        id: doc.id,
        uid: doc.data().uid,
        pending: doc.data().pending,
      })) ?? []
    );
  }

  updateTask(idTask: string, update: UpdateTaskKeys): Promise<WriteResult> {
    const updatedDoc = {
      ...update,
      updatedAt: new Date(),
    };

    return db
      .collection("tasks")
      .doc(idTask)
      .update(updatedDoc as { [key: string]: any });
  }

  async deleteTask(idTask: string): Promise<{ ok: boolean; message: string }> {
    try {
      const refDoc = db.doc(`tasks/${idTask}`);
      const doc = (await refDoc.get()).exists;
      if (!doc) throw CustomErrors.badRequest("No task with id provided");
      await refDoc.delete();
      return {
        ok: true,
        message: "Document successfully deleted!",
      };
    } catch (err) {
      if (err instanceof CustomErrors) throw err;
      throw CustomErrors.internalErrorServer(`${err}`);
    }
  }
}
