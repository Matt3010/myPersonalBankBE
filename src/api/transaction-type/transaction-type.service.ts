import { TransactionType } from "./transaction-type.entity";
import { TransactionType as TransactionTypeModel } from "./transaction-type.model";

export class TransactionTypeService {
  async add(name: string, type: string): Promise<TransactionType> {
    const transactionType = await TransactionTypeModel.create({
      name: name,
      type: type,
    });
    return transactionType;
  }

  async get(): Promise<TransactionType[]> {
    return await TransactionTypeModel.find();
  }

  async getByType(type: string): Promise<TransactionType[] | null> {
    const transactionType = await TransactionTypeModel.find({ type });
    return transactionType;
  }

  async getOne(id: string): Promise<TransactionType | null> {
    return await TransactionTypeModel.findById(id);
  }
}

export default new TransactionTypeService();
