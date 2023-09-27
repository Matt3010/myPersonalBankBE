import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO, MobileRechargeDTO, QueryTransactionDTO } from "./transaction.dto";
import transactionService from "./transaction.service";
import { BankAccount as BankAccountModel} from "../bankAccount/bankAccount.model";

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
