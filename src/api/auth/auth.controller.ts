import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists";
import userService from '../user/user.service';
import bankAccountService from "../bankAccount/bankAccount.service";
import transactionService from "../transaction/transaction.service";

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'email', 'password');
    const credentials = pick(req.body, 'email', 'password'); 

    if (!passwordMatch(req.body.password, req.body.confirmPassword)) {
      res.status(400);
      res.json({
        error: 'PasswordMismatchError',
        message: 'Password and confirmPassword do not match',
      });
      return;
    }
    
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

function passwordMatch(password: string, confirmPassword: string) {
  return password === confirmPassword;
}


