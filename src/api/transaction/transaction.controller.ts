import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO } from "./transaction.dto";
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