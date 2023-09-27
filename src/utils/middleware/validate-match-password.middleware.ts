import { NextFunction, Response } from "express";
import { ResetPasswordDTO } from "../../api/user/user.dto";
import { NotFoundError } from "../../errors/not-found";
import { UserIdentity as UserIdentityModel } from "../auth/local/user-identity.model";
import { TypedRequest } from "../typed-request.interface";
import * as bcrypt from "bcrypt";

export const validateMatchPassword = (
  type: string,
  paramName: string
) => {
  return async (req: TypedRequest<ResetPasswordDTO>, res: Response, next: NextFunction) => {
    const value =
      type === "params" ? req.params[paramName] : req[type][paramName];

    try {
      const account = await UserIdentityModel.findOne({user: req.user?.id!});
      const isMatch = await bcrypt.compare(value, account!.credentials.hashedPassword);
  
      if(isMatch) {
        next();
      }
      else {
        throw new Error();
      }
      
    } catch (err) {
      res.status(400).json({ message: 'Old password is incorrect' });
    }
  };
};
