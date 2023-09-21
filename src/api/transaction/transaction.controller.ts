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
        const {bankAccount, transactionType, description} = req.body
        const importo = req.body.import;
        const newTransaction = await transactionService.add(bankAccount, transactionType, importo, description);
        
        res.send(newTransaction);
    } catch (err) {
      next(err);
    }
  }