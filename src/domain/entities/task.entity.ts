import { Task } from "../../types";

export class TaskEntity {
  public readonly title: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly completed: boolean;
  public readonly id: string;
  public readonly updatedAt: Date;
  public readonly uid: string;
  public readonly pending: boolean
  constructor({
    title,
    description,
    createdAt,
    completed,
    id,
    updatedAt,
    uid,
    pending
  }: Task) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.completed = completed;
    this.id = id!;
    this.updatedAt = updatedAt;
    this.uid = uid;
    this.pending = pending
  }
}
