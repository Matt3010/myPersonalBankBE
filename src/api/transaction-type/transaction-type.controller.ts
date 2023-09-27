import { NextFunction, Request, Response } from 'express';
import transactionTypeService from './transaction-type.service';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await transactionTypeService.get();
        res.json(list);
    } catch(err) {
        next(err);
    }   
}
