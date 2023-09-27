import { NextFunction, Request, Response } from "express";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { TypedRequest } from "../../utils/typed-request.interface";
import { MailResetDTO, ResetPasswordDTO } from "./user.dto";
import * as bcrypt from "bcrypt";
import passwordGenerator from 'password-generator';
import { sendResetEmail } from "../../utils/sendResetMail";

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
};

export const sendMail = async (
  req: TypedRequest<MailResetDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    
    function getRandomSpecialChar() {
      const specialChars = '!@#$%^&*()_-+=<>?';
      return specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    }
    
    const newPassword = passwordGenerator(12, false, /[\w\d\?\-]/, 'Aa1') + getRandomSpecialChar();

    await sendResetEmail(email, newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserIdentityModel.findOne({"credentials.email" : email});

    await UserIdentityModel.updateOne(
      { user: user!.user },
      { "credentials.hashedPassword": hashedPassword }
    );

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
};