import { Request, Response, NextFunction } from "express";
import { BankAccount as BankAccountModel} from "../api/bankAccount/bankAccount.model";

export const checkAmount = (
  importo: number,
  origin: string = 'body',
  paramName: string = 'bankAccount'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const value =
      origin === "params" ? req.params[paramName] : req[origin][paramName];

    try {
      const document = await BankAccountModel.findById(value);
      if(Math.sign(document?.amount! - importo) == 0 || Math.sign(document?.amount! - importo) == 1) {
        next();
      }
      else {
        throw new Error();
      }
    } catch (err) {
      next(err);
    }
  };
};
