import {MapToCamelCaseDomain, MapToSnakeCaseDTO} from "./case.types.js";


export interface Note {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  type: 'default' | 'confirmation';
}

export type NoteServerDTO = MapToSnakeCaseDTO<Note>;
export type ReconstructedNote = MapToCamelCaseDomain<NoteServerDTO>;