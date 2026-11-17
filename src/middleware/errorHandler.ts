import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      message: err.message || 'Internal server error',
    });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
  });
}
