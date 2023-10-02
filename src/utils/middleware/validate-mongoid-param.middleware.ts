import { Request, Response, NextFunction } from "express";
import * as mongoose from 'mongoose';
import { CastMongoId } from "../../errors/cast-error";
import IpAddressService  from "../../api/ip-address/ip-address.service";

export const validateMongoIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = req.params[paramName];
      if (value === ':id') {
        IpAddressService.add(req.ip, false, 'Transaction error: BankAccount ID is required');
        throw new Error('BankAccount ID is required');
      }
  
      if (mongoose.Types.ObjectId.isValid(value)) {
        next();
      } else {
        IpAddressService.add(req.ip, false, 'Transaction error: Invalid MongoDB ID');
        throw new CastMongoId();
      }
    }
    catch(err) {
      next(err);
    }
    
  }
}
