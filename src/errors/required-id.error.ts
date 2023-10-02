import { Request, Response, NextFunction } from "express";

export const IdRequiredHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'BankAccount ID is required') {
      res.status(400).json({ error: 'BankAccount ID is required' });
    } else {
      next(err);
    }
  };
  