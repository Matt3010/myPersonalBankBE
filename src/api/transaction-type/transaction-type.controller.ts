import { Request, Response, NextFunction } from 'express';
import transactionTypeService from './transaction-type.service';
import { TransactionType } from './transaction-type.entity';
import { TypedRequest } from '../../utils/typed-request.interface';
import { NotFoundError } from '../../errors/not-found';
import { AddTransactionTypeDTO } from './transaction-type.dto';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const list = await transactionTypeService.get();
    res.json(list);
}

export const add = async (req: TypedRequest<AddTransactionTypeDTO>, res: Response, next: NextFunction) => {
    try {
        const { name, type } = req.body;
        const newItem: TransactionType = { name, type };
        const saved = await transactionTypeService.add(name, type);
        res.json(saved);
    } catch (err) {
        next(err);
    }
}
