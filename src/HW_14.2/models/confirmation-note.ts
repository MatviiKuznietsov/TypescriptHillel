import {BaseNote} from "./base-note.js";


export class ConfirmationNote extends BaseNote {
  edit(update: any) {
    if (!confirm('Confirm edit?')) return this.getInfo();
    return super.edit(update);
  }

  confirmDelete() {
    return confirm('Confirm delete?');
  }
}