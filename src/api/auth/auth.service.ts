import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { LoginDTO } from "./auth.dto";
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";
import IpAddressService from "../ip-address/ip-address.service";


export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      IpAddressService.add(req.ip, false, 'Login error: generic');
      console.log(err);
      return next(err);
    }
    if (!user) {
      IpAddressService.add(req.ip, false, 'Login error: user not found or wrong password');
      res.status(401);
      res.json({
        error: 'LoginError',
        message: info.message
      });
      return;
    }
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7 days' });
    IpAddressService.add(req.ip, true, 'login successful');
    res.status(200);
    res.json({
      user,
      token
    });
  })(req, res, next);
};
