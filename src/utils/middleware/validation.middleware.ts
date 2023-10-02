import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validate as classValidate } from 'class-validator';
import { ValidationError } from "../../errors/validation";
import { TypedRequest } from "./../typed-request.interface";
import IpAddressService from "../../api/ip-address/ip-address.service";

export function validate<T extends object>(type: (new() => T), origin: 'body'): (req: TypedRequest<T>, res: Response, next: NextFunction) => Promise<void>
export function validate<T extends object>(type: (new() => T), origin: 'query'): (req: TypedRequest<any, T>, res: Response, next: NextFunction) => Promise<void>
export function validate<T extends object>(type: (new() => T)): (req: TypedRequest<T>, res: Response, next: NextFunction) => Promise<void>
export function validate<T extends object>(type: (new() => T), origin: 'body' | 'query' = 'body') {
  return async (req: TypedRequest<any, any>, res: Response, next: NextFunction) => {
    const data = plainToClass(type, req[origin]);
    const errors = await classValidate(data, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length) {
      const missingFields = errors.map(error => error.property).join(', ');
      const errorMessage = `Validation error: The following fields are missing or invalid: ${missingFields}`;
      console.log(errorMessage);
      IpAddressService.add(req.ip, false, errorMessage);
      next(new ValidationError(errors));
    } else {
      req[origin] = data;
      next();
    }
  }
}
