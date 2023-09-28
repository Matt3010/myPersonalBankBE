import { NextFunction, Request, Response } from "express";
import bankAccountService from "./bankAccount.service";
import transactionService from "../transaction/transaction.service";

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
    await transactionService.openTransaction(bankAccount.id!);
    res.send(bankAccount);
  } catch (err) {
    next(err);
  }
}



export const deleteBankAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bankAccount = req.params.id!;
      const deleted = await bankAccountService.delete(bankAccount);
      if(deleted) res.send({message: "BankAccount deleted"})
    } catch (err) {
      next(err);
    }
  }
