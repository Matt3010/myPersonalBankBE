import { NextFunction, Response } from "express";
import {
  AddTransictionDTO,
  MobileRechargeDTO,
  TransferDTO,
} from "../../api/transaction/transaction.dto";
import transactionService from "../../api/transaction/transaction.service";
import { TypedRequest } from "../typed-request.interface";
import { Model } from "mongoose";
import { NoFundsError } from "../../errors/no-funds";
import transactionTypeService from "../../api/transaction-type/transaction-type.service";

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
