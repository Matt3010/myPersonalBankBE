import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransictionDTO, ListFromNumberAndTypeDTO, ListFromNumberDTO } from "./transaction.dto";
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

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bankAccount = req.params.id!;
    const list = await transactionService.list(bankAccount);
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
  try{
    const bankAccount = req.params.id!;
    const number = req.body.number;
    const list = await transactionService.listByNumber(bankAccount, number);
    res.send(list);
    }
    catch(err){
      next(err)
    }
}

export const listByType = async (
  req: TypedRequest<ListFromNumberAndTypeDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const bankAccount = req.params.id!;
    const number = req.body.number; 
    const type = req.body.type;
    
    console.log(`bank account : ${bankAccount}`);
    
    const list = await transactionService.listByCategory(bankAccount, number, type);

    res.send(list);
  } catch(err) {
    next(err);
  }
}
