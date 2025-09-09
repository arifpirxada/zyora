import { NextFunction, Request, Response } from 'express';
import BaseError from './BaseError';
import { HttpStatusCode } from '../../types';

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.log(err)
  // Catch Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
    return;
  }

  const isOperational = err instanceof BaseError && err.isOperational;

  const statusCode =
    err instanceof BaseError ? err.statusCode : HttpStatusCode.INTERNAL_SERVER;

  const message = isOperational
    ? err.message
    : 'Something went wrong. Please try again later.';

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
