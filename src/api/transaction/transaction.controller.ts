import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO, ListFromNumberDTO } from "./transaction.dto";
import transactionService from "./transaction.service";
import bankAccountService from "../bankAccount/bankAccount.service";
import { BankAccount } from "../bankAccount/bankAccount.entity";

export const add = async (
    req: TypedRequest<AddTransictionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { bankAccount, transactionType, amount, description } = req.body
        const newTransaction = await transactionService.add(bankAccount, transactionType, amount, description);
        res.send(newTransaction);
    } catch (err) {
      next(err);
    }
  }

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bankAccount = await bankAccountService.getFromUser(req.user?.id!);
    const list = await transactionService.list(bankAccount.id!);
    res.send(list);  
  } catch (err) {
    next(err);
  }
}

export const listByNumber = async (
  req: TypedRequest<ListFromNumberDTO>,
  res: Response,
  next: NextFunction
) => {
    const number = req.body.number;
    const bankAccount = await bankAccountService.getFromUser(req.user?.id!);
    const list = await transactionService.listByNumber(bankAccount.id!, number);
    res.send(list);
}

export const listByType = async (
  req: TypedRequest<ListFromNumberDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.params.id; 
    const number = req.body.number;

    const bankAccount = await bankAccountService.getFromUser(req.user?.id!);

    const list = await transactionService.listByCategory(bankAccount.id!, number, type);

    res.send(list);
  } catch(err) {
    next(err);
  }
}