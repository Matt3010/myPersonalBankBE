import { NextFunction, Response } from "express";
import transactionTypeService from "../../api/transaction-type/transaction-type.service";
import {
  AddTransictionDTO
} from "../../api/transaction/transaction.dto";
import transactionService from "../../api/transaction/transaction.service";
import { NoFundsError } from "../../errors/no-funds";
import { TypedRequest } from "../typed-request.interface";

export const validateAmount = (
  transaction: string,
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

      if (transaction === "Add") {
        const transactionType = await transactionTypeService.getOne(
          req.body.transactionType
        );

        if (transactionType?.type === "Uscita") {
          const balanceDifference = lastTransaction?.balance! - req.body.amount;
          if (balanceDifference >= 0) {
            next();
          } else {
            throw new NoFundsError();
          }
        } else {
          next();
        }
      } else {
        const balanceDifference = lastTransaction?.balance! - req.body.amount;
          if (balanceDifference >= 0) {
            next();
          } else {
            throw new NoFundsError();
          }
      }
    } catch (err) {
      next(err);
    }
  };
};
