import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import IpAddressService from "../../api/ip-address/ip-address.service";

export const validateModelID = (
  model: Model<any>,
  type: string,
  paramName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const value =
      type === "params" ? req.params[paramName] : req[type][paramName];

    try {
      const document = await model.findById(value);

      if (!document) {
        IpAddressService.view(req.ip, false);
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
