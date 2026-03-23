import {Note} from "../types/note.types.js";


export class BaseNote {
  constructor(protected data: Note) {}

  edit(update: Partial<Note>) {
    this.data = { ...this.data, ...update };
    return this.data;
  }

  markCompleted() {
    this.data.isCompleted = true;
  }

  getInfo() {
    return this.data;
  }
}