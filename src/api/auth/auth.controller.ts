import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO, MailResetDTO } from "./auth.dto";
import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists";
import userService from '../user/user.service';
import bankAccountService from "../bankAccount/bankAccount.service";
import transactionService from "../transaction/transaction.service";
import * as bcrypt from "bcrypt";
import passwordGenerator from 'password-generator';
import { sendResetEmail } from "../../utils/sendResetMail";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";


export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'email', 'password');
    const credentials = pick(req.body, 'email', 'password'); 
    
    const newUser = await userService.add(userData, credentials);
    const bankAccount = await bankAccountService.add(newUser.id!);
    await transactionService.openTransaction(bankAccount.id!);
    res.send(bankAccount);
    
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.send(err.message);
    } else {
      next(err);
    }
  }
}

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

    await UserIdentityModel.updateOne(
      { "credentials.email" : email },
      { "credentials.hashedPassword": hashedPassword }
    );

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
};

