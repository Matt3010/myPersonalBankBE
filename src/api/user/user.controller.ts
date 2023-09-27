import { NextFunction, Request, Response } from "express";
import { UserIdentity as UserIdentityModel} from "../../utils/auth/local/user-identity.model";

export const me = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await UserIdentityModel.find({user: req.user?.id!});
  const profile = {
    user: req.user,
    email: email[0].credentials.email
  }

  res.json(profile);
}