import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO, MobileRechargeDTO, QueryTransactionDTO } from "./transaction.dto";
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
    req: TypedRequest<any, QueryTransactionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bankAccount = req.params.id!;
      const list = await transactionService.find(bankAccount, req.query);
      res.send(list);  
    } catch (err) {
      next(err);
    }
  }

  export const mobileRecharge = async (
    req: TypedRequest<MobileRechargeDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        
    } catch (err) {
      next(err);
    }
  }
