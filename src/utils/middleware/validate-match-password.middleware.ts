import * as bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import IpAddressService from "../../api/ip-address/ip-address.service";
import { ResetPasswordDTO } from "../../api/user/user.dto";
import { UserIdentity as UserIdentityModel } from "../auth/local/user-identity.model";
import { TypedRequest } from "../typed-request.interface";

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
        IpAddressService.add(req.ip, false, 'Change password error: old password not match with your typed password');
        throw new Error();
      }
      
    } catch (err) {
      IpAddressService.add(req.ip, false, 'Change password error: old password is incorrect');
      res.status(400).json({ message: 'Old password is incorrect' });
    }
  };
};
