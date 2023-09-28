import { Request, Response, NextFunction } from "express";
import ipAddressService from "./ip-address.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await ipAddressService.get();
      res.send(list);
    } catch (err) {
      next(err);
    }
  };