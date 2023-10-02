import { NextFunction, Request, Response } from "express";
import bankAccountService from "../../api/bankAccount/bankAccount.service";
import IpAddressService from "../../api/ip-address/ip-address.service";
import transactionService from "../../api/transaction/transaction.service";
import { NotFoundError } from "../../errors/not-found";

export const validateBankAccountOwner = (
  details: boolean,
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let value = type === "params" ? req.params[paramName] : req[type][paramName];
      
      if (details) {
        const transaction = await transactionService.getOne(value);
        value = transaction?.bankAccount.toString();
      }

      const bankAccounts = await bankAccountService.get(req.user?.id!);
      const isValueInBankAccounts = bankAccounts.some(account => account.id === value);

      if (!isValueInBankAccounts) {
        IpAddressService.add(
          req.ip,
          false,
          'Transaction error: unable to execute transaction in an iban not attested to the user'
        );

        throw new NotFoundError(
          "You are not logged into this account, and you cannot perform this operation."
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};