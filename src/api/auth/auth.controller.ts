import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO, LoginDTO } from "./auth.dto";
import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists";
import userService from '../user/user.service';
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";
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
  console.log(password === confirmPassword);
  return password === confirmPassword;
}

export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.json({
        error: 'LoginError',
        message: info.message
      });
      return;
    }
    const token = jwt.sign(user, JWT_SECRET, {expiresIn: '7 days'});
    res.status(200);
    res.json({
      user,
      token
    });
  })(req, res, next);
}


