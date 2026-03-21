export enum Status {
  Pending = "Pending",
  Completed = "Completed",
}

export abstract class TodoItem {
  static idCounter = 1;
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public status: Status;

  constructor(
    public title: string,
    public content: string
  ) {
    if (!title.trim() || !content.trim()) {
      throw new Error("Note cannot be empty");
    }
    this.id = TodoItem.idCounter++;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = Status.Pending;
  }

  abstract edit(title: string, content: string): void;

  markCompleted() {
    this.status = Status.Completed;
    this.updatedAt = new Date();
  }
}

export class DefaultTodoItem extends TodoItem {
  edit(title: string, content: string) {
    if (!title.trim() || !content.trim()) {
      throw new Error("Note cannot be empty");
    }
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }
}

export class ConfirmEditTodoItem extends TodoItem {
  edit(title: string, content: string) {
    if (!title.trim() || !content.trim()) {
      throw new Error("Note cannot be empty");
    }
    const confirmEdit = true;
    if (confirmEdit) {
      this.title = title;
      this.content = content;
      this.updatedAt = new Date();
    } else {
      console.log("Editing canceled by user");
    }
  }
}