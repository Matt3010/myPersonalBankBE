import { NextFunction, Request, Response } from "express";
import bankAccountService from "./bankAccount.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bankAccount = await bankAccountService.get(req.user?.id!);
    res.send(bankAccount);
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bankAccount = await bankAccountService.add(req.user?.id!);
    res.send(bankAccount);
  } catch (err) {
    next(err);
  }
}
