import express from 'express';

import { noteController } from '../controllers';
import {
  authMiddleware,
  moveNotesToTrashMiddleware,
  notesPinnedMiddleware,
  noteTrashMiddleware,
  otherNotesMiddleware,
  restoreNotesFromTrashMiddleware,
  validateMiddleware,
  validTopicsMiddleware,
} from '../middlewares';
import { createNoteSchema, deleteManyNoteSchema, updateNoteSchema } from '../schema';

const noteRouter = express.Router();
// Get notes
noteRouter.get('/', authMiddleware(), noteController.getNotes);
// Get notes pinned
noteRouter.get('/pins', authMiddleware(), notesPinnedMiddleware, noteController.getNotes);
// Get notes in trash
noteRouter.get('/trashs', authMiddleware(), noteTrashMiddleware, noteController.getNotes);
// Get other notes
noteRouter.get('/others', authMiddleware(), otherNotesMiddleware, noteController.getNotes);
// Get note by id
noteRouter.get('/:id', authMiddleware(), noteController.getNoteDetail);
// Create a new note
noteRouter.post(
  '/',
  authMiddleware(),
  validateMiddleware(createNoteSchema),
  validTopicsMiddleware,
  noteController.createNote
);
// Move many notes to trash
noteRouter.put(
  '/move-to-trash',
  authMiddleware(),
  validateMiddleware(deleteManyNoteSchema),
  moveNotesToTrashMiddleware,
  noteController.moveNotesToTrash
);
// Restore note from trash
noteRouter.put(
  '/restore-from-trash',
  authMiddleware(),
  validateMiddleware(deleteManyNoteSchema),
  restoreNotesFromTrashMiddleware,
  noteController.moveNotesToTrash
);
// Update note
noteRouter.put(
  '/:id',
  authMiddleware(),
  validateMiddleware(updateNoteSchema),
  validTopicsMiddleware,
  noteController.updateNote
);
// Delete note
noteRouter.delete('/:id', authMiddleware(), noteController.deleteNote);
// Delete many notes
noteRouter.delete(
  '/',
  authMiddleware(),
  validateMiddleware(deleteManyNoteSchema),
  noteController.deleteNotes
);

export default noteRouter;
