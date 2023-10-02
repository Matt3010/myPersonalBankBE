import { NextFunction, Response } from "express";
import IpAddressService from "../../api/ip-address/ip-address.service";
import { AddTransictionDTO } from "../../api/transaction/transaction.dto";
import transactionService from "../../api/transaction/transaction.service";
import transactionTypeService from "../../api/transaction-type/transaction-type.service";
import { NoFundsError } from "../../errors/no-funds";
import { TypedRequest } from "../typed-request.interface";

export const validateAmountTransaction = (
  type: string,
  paramName: string
) => {
  return async (
    req: TypedRequest<AddTransictionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const value =
        type === "params" ? req.params[paramName] : req[type][paramName];
        const lastTransaction = await transactionService.last(value);

        const transactionType = await transactionTypeService.getOne(
          req.body.transactionType
        );

        if (transactionType?.type === "Uscita") {
          const balanceDifference =
            lastTransaction?.balance! - req.body.amount;
          if (balanceDifference >= 0) {
            next();
          } else {
            IpAddressService.add(
              req.ip,
              false,
              "Transaction failed: balance not available to perform the transaction"
            );
            throw new NoFundsError();
          }
        } else {
          next();
        }
      } catch (err) {
      next(err);
    }
  };
};
