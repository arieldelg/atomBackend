export interface Task {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  id?: string;
  uid: string;
}

export interface ResponseHTTP {
  ok: boolean;
}

export interface AddTask extends ResponseHTTP {
  data: Task;
}

export interface GetAllTasks extends ResponseHTTP {
  data: Task[];
}

export interface UpdateTask extends ResponseHTTP {
  data?: Task;
}

export interface UpdateTaskKeys {
  title?: string;
  description?: string;
  createdAt?: Date;
  completed?: boolean;
  updatedAt?: Date;
  uid: string;
}

export type CreationTaskKeys = "title" | "description" | "completed" | "uid";

export enum TaskEnum {
  "title",
  "description",
  "completed",
  "uid",
}

export const taskMap: Record<CreationTaskKeys, string> = {
  completed: "boolean",
  description: "string",
  title: "string",
  uid: "string",
};
