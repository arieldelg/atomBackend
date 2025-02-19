export interface Task {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  pending: boolean;
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
  pending?: boolean
}

export type CreationTaskKeys = "title" | "description" | "completed" | "pending"
