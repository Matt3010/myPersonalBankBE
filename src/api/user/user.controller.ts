import { NextFunction, Response, Request } from "express";
import { UserIdentity, userIdentitySchema } from "../../utils/auth/local/user-identity.model";

export const me = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await UserIdentity.find({user: req.user?.id!});

  const profile = {
    user: {user: req.user, email: email[0].credentials.email},
  }
  res.json(profile);
}