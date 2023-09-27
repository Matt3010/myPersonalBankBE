import { Request, Response, NextFunction } from "express";
import * as mongoose from 'mongoose';
import { CastMongoId } from "../../errors/cast-error";

export const validateMongoIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    if (mongoose.Types.ObjectId.isValid(value)) {
      next();
    } else {
      throw new CastMongoId();
    }
  }
}
