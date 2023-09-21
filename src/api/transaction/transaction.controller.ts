import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO, ListFromNumberDTO } from "./transaction.dto";
import transactionService from "./transaction.service";

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
    console.log(req.params);
    const list = await transactionService.list(req.body.bankAccount!);
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
    const list = await transactionService.listByNumber(req.body.bankAccount!, number);
    res.send(list);
}

export const listByType = async (
  req: TypedRequest<ListFromNumberDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params);
    const type = req.params.id; 
    const number = req.body.number; 
    
    const list = await transactionService.listByCategory(req.body.bankAccount!, number, type);

    res.send(list);
  } catch(err) {
    next(err);
  }
}
