import { TransactionType } from "./transaction-type.entity";
import { TransactionType as TransactionTypeModel } from "./transaction-type.model";


export class TransactionTypeService {
    async add(name: string, type: string): Promise<TransactionType> {
        const transactionType =
            await TransactionTypeModel.create({ name: name, type: type })
        return transactionType;
    };

    async get(): Promise<TransactionType[]> {
        return TransactionTypeModel.find();
    }
}

export default new TransactionTypeService();
