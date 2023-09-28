import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { TypedRequest } from "../../utils/typed-request.interface";
import { ResetPasswordDTO } from "./user.dto";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const email = await UserIdentityModel.find({ user: req.user?.id! });
  const profile = {
    user: req.user,
    email: email[0].credentials.email,
  };

  res.json(profile);
};

export const reset = async (
  req: TypedRequest<ResetPasswordDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserIdentityModel.updateOne(
      { user: req.user?.id! },
      { "credentials.hashedPassword": hashedPassword }
    );

    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    next(err);
  }
}