import {TodoList} from "./NotesLists.js";
import {Status} from "./TypeNotes.js";

export class AdvancedTodoList extends TodoList {
  search(query: string) {
    query = query.toLowerCase();
    return this.getAll().filter(
      t => t.title.toLowerCase().includes(query) || t.content.toLowerCase().includes(query)
    );
  }

  sortBy(field: "status" | "createdAt", ascending: boolean = true) {
    return this.getAll().sort((a, b) => {
      let valA: any = a[field];
      let valB: any = b[field];

      if (field === "status") {
        valA = a.status === Status.Completed ? 1 : 0;
        valB = b.status === Status.Completed ? 1 : 0;
      } else {
        valA = a.createdAt.getTime();
        valB = b.createdAt.getTime();
      }

      return ascending ? valA - valB : valB - valA;
    });
  }
}