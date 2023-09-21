import { NextFunction, Request, Response } from "express";

export class NotFoundError extends Error {
  constructor(customError : string = 'User not found') {
    super();
    this.name = 'Not Found Error';
    this.message = customError;
  }
}

export const notFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotFoundError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}