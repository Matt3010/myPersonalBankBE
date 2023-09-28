import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import bankAccountService from "../../api/bankAccount/bankAccount.service";
import IpAddressService from "../../api/ip-address/ip-address.service";
import transactionService from "../../api/transaction/transaction.service";

export const validateBankAccountOwner = (
  details: boolean,
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let value =
      type === "params" ? req.params[paramName] : req[type][paramName];

    try {
      if(details == true) {
        const transaction = await transactionService.getOne(value);
        value = transaction?.bankAccount.toString();
        console.log(value);
      }
      const bankAccounts = await bankAccountService.get(req.user?.id!);
      const isValueInBankAccounts = bankAccounts.some(account => account.id === value);
      console.log(isValueInBankAccounts);
      if (!isValueInBankAccounts) {
        IpAddressService.view(req.ip, false, 'transaction error: unable to execute transaction in an iban not attested to the user');
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
