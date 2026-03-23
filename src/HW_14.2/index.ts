import {NoteServerDTO} from "./types/note.types.js";
import {NoteService} from "./services/note.service.js";


const mockServerResponse: NoteServerDTO[] = [/* твои данные */];

const service = new NoteService(mockServerResponse);

service.add({
  noteId: '10',
  noteTitle: '   Новая заметка   ',
  noteContent: '   Контент   ',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isCompleted: false,
  type: 'default',
});

console.log(service.getStats());
console.log(service.search('Гетсбі'));
console.log(service.getAllDTO());