import { NextFunction, Request, Response } from 'express';

export const notesPinnedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.query = {
    ...req.query,
    is_pin: JSON.stringify(true),
    is_trash: JSON.stringify(false),
  };
  next();
};

export const noteTrashMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.query = {
    ...req.query,
    is_trash: JSON.stringify(true),
  };
  next();
};

export const moveNotesToTrashMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.query = {
    ...req.query,
    is_trash: JSON.stringify(true),
  };
  next();
};

export const restoreNotesFromTrashMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query = {
    ...req.query,
    is_trash: JSON.stringify(false),
  };
  next();
};

export const otherNotesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.query = {
    ...req.query,
    topics: [],
    is_trash: JSON.stringify(false),
    is_pin: JSON.stringify(false),
  };
  next();
};
