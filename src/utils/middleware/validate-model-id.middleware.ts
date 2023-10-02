import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import IpAddressService from "../../api/ip-address/ip-address.service";
import { NotFoundError } from "../../errors/not-found";

export const validateModelID = (
  model: Model<any>,
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = type === "params" ? req.params[paramName] : req[type][paramName];
      
      const document = await model.findById(value);

      if (!document) {
        IpAddressService.add(req.ip, false, 'Transaction error: Iban not found in model');
        throw new NotFoundError(
          "Document with the specified value was not found in the model."
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
