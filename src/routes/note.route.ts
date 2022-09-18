import express from 'express';

import { noteController } from '../controllers';
import { authMiddleware } from '../middlewares';

const noteRouter = express.Router();
// Get notes
noteRouter.get('/', authMiddleware, noteController.getNotes);
// Get note by id
noteRouter.get('/:id', authMiddleware, noteController.getNoteDetail);
// Create a new note
noteRouter.post('/', authMiddleware, noteController.createNote);
// Move many notes to trash
noteRouter.put('/trash', authMiddleware, noteController.moveNotesToTrash);
// Update note
noteRouter.put('/:id', authMiddleware, noteController.updateNote);
// Delete note
noteRouter.delete('/:id', authMiddleware, noteController.deleteNote);
// Delete many notes
noteRouter.delete('/', authMiddleware, noteController.deleteNotes);

export default noteRouter;
