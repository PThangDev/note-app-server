import express from 'express';

import { noteController } from '../controllers';
import { authMiddleware, validateMiddleware, validTopicsMiddleware } from '../middlewares';
import { createNoteSchema, deleteManyNoteSchema, updateNoteSchema } from '../schema';

const noteRouter = express.Router();
// Get notes
noteRouter.get('/', authMiddleware, noteController.getNotes);
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
  '/trash',
  authMiddleware,
  validateMiddleware(deleteManyNoteSchema),
  noteController.moveNotesToTrash
);
// Update note
noteRouter.put(
  '/:id',
  authMiddleware,
  validateMiddleware(updateNoteSchema),
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
