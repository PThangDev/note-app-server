import { NextFunction, Response } from 'express';

import { noteService } from '../services';
import { RequestAuth } from '../types';

// [GET] /notes
export const getNotes = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.getNotes(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [GET] /notes/:id
export const getNoteDetail = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.getNoteDetail(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

// [POST] /notes
export const createNote = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.createNote(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [PUT] /notes/:id
export const updateNote = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.updateNote(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [PUT] /notes/trash
export const moveNotesToTrash = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.moveNotesToTrash(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [DELETE] /notes/:id
export const deleteNote = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.deleteNote(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [DELETE] /notes
export const deleteNotes = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await noteService.deleteNotes(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
