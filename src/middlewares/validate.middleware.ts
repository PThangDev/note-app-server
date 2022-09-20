import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const validateMiddleware =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateMiddleware;
