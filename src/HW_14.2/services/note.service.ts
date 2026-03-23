import {DefaultNote} from "../models/default-note.js";
import {ConfirmationNote} from "../models/confirmation-note.js";
import {Note, NoteServerDTO, ReconstructedNote} from "../types/note.types.js";
import {mapFromDTO, mapToDTO} from "../dto/note.mapper.js";
import {AutoUpdateTimestamp, SanitizeInput, ValidateNotEmpty} from "../decorators/note.decorators.js";


export class NoteService {
  private notes: (DefaultNote | ConfirmationNote)[] = [];

  constructor(data: NoteServerDTO[]) {
    this.notes = data.map(dto => {
      const note = mapFromDTO(dto);
      return note.type === 'confirmation'
        ? new ConfirmationNote(note)
        : new DefaultNote(note);
    });
  }

  @SanitizeInput
  @ValidateNotEmpty
  add(note: ReconstructedNote) {
    const instance =
      note.type === 'confirmation'
        ? new ConfirmationNote(note)
        : new DefaultNote(note);

    this.notes.push(instance);
  }

  remove(id: string) {
    const note = this.notes.find(n => n.getInfo().noteId === id);

    if (note instanceof ConfirmationNote) {
      if (!note.confirmDelete()) return;
    }

    this.notes = this.notes.filter(n => n.getInfo().noteId !== id);
  }

  @SanitizeInput
  @ValidateNotEmpty
  @AutoUpdateTimestamp
  edit(id: string, update: Partial<Note>) {
    const note = this.notes.find(n => n.getInfo().noteId === id);
    if (!note) throw new Error('Not found');

    return note.edit(update);
  }

  get(id: string) {
    return this.notes.find(n => n.getInfo().noteId === id)?.getInfo();
  }

  markCompleted(id: string) {
    this.notes
    .find(n => n.getInfo().noteId === id)
    ?.markCompleted();
  }

  search(query: string) {
    return this.notes.filter(n => {
      const { noteTitle, noteContent } = n.getInfo();
      return (
        noteTitle.includes(query) ||
        noteContent.includes(query)
      );
    });
  }

  sortByCreated() {
    return [...this.notes].sort(
      (a, b) =>
        new Date(a.getInfo().createdAt).getTime() -
        new Date(b.getInfo().createdAt).getTime()
    );
  }

  sortByStatus() {
    return [...this.notes].sort(
      (a, b) =>
        Number(a.getInfo().isCompleted) -
        Number(b.getInfo().isCompleted)
    );
  }

  getStats() {
    const total = this.notes.length;
    const completed = this.notes.filter(n => n.getInfo().isCompleted).length;

    return {
      total,
      remaining: total - completed,
    };
  }

  getAllDTO(): NoteServerDTO[] {
    return this.notes.map(n => mapToDTO(n.getInfo()));
  }
}