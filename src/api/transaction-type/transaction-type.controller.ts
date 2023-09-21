import { Request, Response, NextFunction } from 'express';
import transactionTypeService from './transaction-type.service';

import { TypedRequest } from '../../utils/typed-request.interface';
import { AddTransactionTypeDTO } from './transaction-type.dto';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await transactionTypeService.get();
        res.json(list);
    } catch(err) {
        next(err);
    }   
}

export const add = async (req: TypedRequest<AddTransactionTypeDTO>, res: Response, next: NextFunction) => {
    try {
        const { name, type } = req.body;
        const saved = await transactionTypeService.add(name, type);
        res.json(saved);
    } catch (err) {
        next(err);
    }
}
