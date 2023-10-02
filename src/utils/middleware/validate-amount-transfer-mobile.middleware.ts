import { NextFunction, Response } from "express";
import {
  TransferDTO
} from "../../api/transaction/transaction.dto";
import transactionService from "../../api/transaction/transaction.service";

import IpAddressService from "../../api/ip-address/ip-address.service";
import { NoFundsError } from "../../errors/no-funds";
import { TypedRequest } from "../typed-request.interface";

export const validateAmountTransferOrMobile = (
  type: string,
  paramName: string
) => {
  return async (
    req: TypedRequest<TransferDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const value =
        type === "params" ? req.params[paramName] : req[type][paramName];
        const lastTransaction = await transactionService.last(value);

        const balanceDifference = lastTransaction?.balance! - req.body.amount;

        if (balanceDifference >= 0) {
          next();
        } else {
          IpAddressService.add(
            req.ip,
            false,
            "Mobile recharge or transfer failed: balance not available to perform the transaction"
          );
          throw new NoFundsError();
        }
      } catch (err) {
      next(err);
    }
  };
};
