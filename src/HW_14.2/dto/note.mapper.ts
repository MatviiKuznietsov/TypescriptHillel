import {NoteServerDTO, ReconstructedNote} from "../types/note.types.js";


export function mapFromDTO(data: NoteServerDTO): ReconstructedNote {
  return {
    noteId: data.note_id,
    noteTitle: data.note_title,
    noteContent: data.note_content,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    isCompleted: data.is_completed,
    type: data.type,
  };
}

export function mapToDTO(data: ReconstructedNote): NoteServerDTO {
  return {
    note_id: data.noteId,
    note_title: data.noteTitle,
    note_content: data.noteContent,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    is_completed: data.isCompleted,
    type: data.type,
  };
}