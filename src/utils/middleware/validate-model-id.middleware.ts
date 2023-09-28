import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import IpAddressService from "../../api/ip-address/ip-address.service";
import transactionService from "../../api/transaction/transaction.service";
import { BankAccount } from "../../api/bankAccount/bankAccount.model";

export const validateModelID = (
  model: Model<any>,
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const value =
      type === "params" ? req.params[paramName] : req[type][paramName];

    try {

      let document = null;
      console.log(model.modelName);
      if(model.modelName !== 'Transaction') {
        document = await model.findById(value);
      }
      else {
        const transaction = await transactionService.getOne(value);
        document = await BankAccount.findById(transaction?.bankAccount);
      }
     

      if (!document) {
        IpAddressService.view(req.ip, false, 'transaction error: iban not found in model');
        throw new NotFoundError(
          `Document with ID ${value} not found in the model.`
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
