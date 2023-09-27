import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import bankAccountService from "../../api/bankAccount/bankAccount.service";

export const validateBankAccountOwner = (
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const value =
      type === "params" ? req.params[paramName] : req[type][paramName];

    try {
      const bankAccounts = await bankAccountService.get(req.user?.id!);
      const isValueInBankAccounts = bankAccounts.some(account => account.id === value);
      
      if (!isValueInBankAccounts) {
        throw new NotFoundError(
          `You are not logged into this account (${value}), and you cannot perform this operation.`
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
