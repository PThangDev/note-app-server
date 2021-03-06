import createErrors from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import noteService from '../services/note.service';
import { IRequestAuth } from '../types';

const noteController = {
  //GET notes
  async getNotesHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { notes, pagination } = await noteService.getNotes(req);
      return res.status(200).json({ data: notes, pagination, message: 'Get topics successfully' });
    } catch (error) {
      next(error);
    }
  },
  // GET note by id
  async getNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const note = await noteService.getNote(req);

      if (!note) throw createErrors(404, 'Note does not exist');

      return res.status(200).json({ data: note, message: 'Get note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // GET notes of 1 topic
  async getNotesOfTopicHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const notes = await noteService.getNotesOfTopic(req);
      return res.status(200).json({ data: notes, message: 'Get notes of topic successfully' });
    } catch (error) {
      next(error);
    }
  },
  // GET notes of many topics
  async getNotesOfTopicsHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const notes = await noteService.getNotesOfTopics(req);
      return res.status(200).json({ data: notes, message: 'Get notes of topics successfully' });
    } catch (error) {
      next(error);
    }
  },
  // POST create note
  async createNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const newNote = await noteService.createNote(req);
      return res.status(201).json({ data: newNote, message: 'Create note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // PUT Update note
  async updateNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const noteUpdated = await noteService.updateNote(req);

      if (!noteUpdated) throw createErrors(400, 'Update failed. Note does not exist');

      return res.status(200).json({ data: noteUpdated, message: 'Update note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // PUT Update many notes
  async updateNotesHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const notesUpdated = await noteService.updateNotes(req);
      return res.status(200).json({ data: notesUpdated, message: 'Update notes successfully' });
    } catch (error) {
      next(error);
    }
  },

  // DELETE delete 1 note
  async deleteNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const noteDeleted = await noteService.deleteNote(req);
      return res.status(200).json({ data: noteDeleted, message: 'Delete note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // DELETE delete many note
  async deleteManyNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const notesDeleted = await noteService.deleteManyNotes(req);
      return res.status(200).json({ data: notesDeleted, message: 'Delete notes successfully' });
    } catch (error) {
      next(error);
    }
  },
};
export default noteController;
