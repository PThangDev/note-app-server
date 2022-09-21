import express from 'express';

import { noteController } from '../controllers';
import {
  authMiddleware,
  notesPinnedMiddleware,
  notesTrashMiddleware,
  otherNotesMiddleware,
  validateMiddleware,
  validTopicsMiddleware,
} from '../middlewares';
import { createNoteSchema, deleteManyNoteSchema, updateNoteSchema } from '../schema';

const noteRouter = express.Router();
// Get notes
noteRouter.get('/', authMiddleware, noteController.getNotes);
// Get notes pinned
noteRouter.get('/pins', authMiddleware, notesPinnedMiddleware, noteController.getNotes);
// Get notes in trash
noteRouter.get('/trashs', authMiddleware, notesTrashMiddleware, noteController.getNotes);
// Get other notes
noteRouter.get('/others', authMiddleware, otherNotesMiddleware, noteController.getNotes);
// Get note by id
noteRouter.get('/:id', authMiddleware, noteController.getNoteDetail);
// Create a new note
noteRouter.post(
  '/',
  authMiddleware,
  validateMiddleware(createNoteSchema),
  validTopicsMiddleware,
  noteController.createNote
);
// Move many notes to trash
noteRouter.put(
  '/trashs',
  authMiddleware,
  validateMiddleware(deleteManyNoteSchema),
  noteController.moveNotesToTrash
);
// Update note
noteRouter.put(
  '/:id',
  authMiddleware,
  validateMiddleware(updateNoteSchema),
  validTopicsMiddleware,
  noteController.updateNote
);
// Delete note
noteRouter.delete('/:id', authMiddleware, noteController.deleteNote);
// Delete many notes
noteRouter.delete(
  '/',
  authMiddleware,
  validateMiddleware(deleteManyNoteSchema),
  noteController.deleteNotes
);

export default noteRouter;
