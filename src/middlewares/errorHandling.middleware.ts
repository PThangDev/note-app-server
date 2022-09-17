import { ErrorRequestHandler } from 'express';

import { uppercaseFirstLetter } from '../helpers';
import logger from '../helpers/logger';

const errorHandlingMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(err);
  // If error has status code === 11000. It's mean some value has already exist in database
  if (err.code === 11000) {
    const fieldError = Object.keys(err.keyValue)[0];
    return res.status(status).json({
      status,
      success: false,
      data: { message: `${uppercaseFirstLetter(fieldError)} has already exists` },
    });
  }
  if (err.path === '_id') {
    return res
      .status(status)
      .json({ status, success: false, data: { message: 'Invalid Id. Please try again' } });
  }
  if (err.message === 'jwt expired') {
    return res.status(401).json({
      status: 401,
      success: false,
      data: { ...err, message: 'Session expired. Please login again' },
    });
  }
  return res.status(status).json({ status, success: false, data: err });
};
export default errorHandlingMiddleware;
