import { Request, Response, NextFunction } from "express";

export class CastMongoId extends Error {
    constructor() {
      super();
      this.name = 'CastMongoId';
      this.message = 'Is not a valid ID';
    }
}

export const castMongoIdHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CastMongoId) {
      res.status(400);
      res.json({
        error: err.name,
        message: err.message
      });
    } else {
      next(err);
    }
  }