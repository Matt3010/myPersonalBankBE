import { NextFunction, Request, Response } from "express";

export class NoFundsError extends Error {
  constructor() {
    super();
    this.name = 'No Funds Error';
    this.message = 'Insufficient funds in your bank account';
  }
}

export const noFundsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NoFundsError) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}
