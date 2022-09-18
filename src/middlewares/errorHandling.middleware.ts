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
      message: `${uppercaseFirstLetter(fieldError)} has already exists`,
      data: err,
    });
  }

  if (err.path === '_id') {
    return res
      .status(status)
      .json({ status, success: false, message: 'Invalid Id. Please try again', data: err });
  }

  if (err.message === 'jwt expired') {
    return res.status(401).json({
      status: 401,
      success: false,
      message: 'Session expired. Please login again',
      data: err,
    });
  }

  if (err?.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 401,
      success: false,
      message: 'Unauthorized. Please login or register',
      data: err,
    });
  }
  return res.status(status).json({ status, success: false, message: err.message });
};
export default errorHandlingMiddleware;
