import {Status, TodoItem} from "./TypeNotes.js";

export class TodoList {
  private todos: TodoItem[] = [];

  add(todo:  TodoItem) {
    this.todos.push(todo);
  }

  remove(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  get(id: number) {
    return this.todos.find(t => t.id === id);
  }

  getAll() {
    return [...this.todos];
  }

  getStats() {
    const total = this.todos.length;
    const pending = this.todos.filter(t => t.status === Status.Pending).length;
    return { total, pending };
  }
}