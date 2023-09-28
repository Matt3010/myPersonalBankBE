import { Request, Response, NextFunction } from "express";
import * as mongoose from 'mongoose';
import { CastMongoId } from "../../errors/cast-error";
import IpAddressService  from "../../api/ip-address/ip-address.service";

export const validateMongoIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    if (mongoose.Types.ObjectId.isValid(value)) {
      next();
    } else {
      IpAddressService.view(req.ip, false, 'transaction error: cast error');
      throw new CastMongoId();
    }
  }
}
