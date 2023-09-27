import { NextFunction, Response } from "express";
import { MobileRechargeDTO } from "../../api/transaction/transaction.dto";
import transactionService from "../../api/transaction/transaction.service";
import { TypedRequest } from "../typed-request.interface";
import { Model } from "mongoose";
import { NoFundsError } from "../../errors/no-founds";

export const validateAmount = (
  model: Model<any>,
  type: string,
  paramName: string
) => {
  return async (req: TypedRequest<MobileRechargeDTO>, res: Response, next: NextFunction) => {
    try {
      const value =
      type === "params" ? req.params[paramName] : req[type][paramName];

      const lastTransaction = await transactionService.last(value);
      const balanceDifference = lastTransaction?.balance! - req.body.amount;
      if (balanceDifference > 0) {
        next();
      }
      else {
        throw new NoFundsError();
      }
    } catch (err) {
      next(err);
    }
  };
};
