import { last } from "lodash";
import bankAccountService from "../bankAccount/bankAccount.service";
import transactionTypeService from "../transaction-type/transaction-type.service";
import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";

export class TransactionService {
  async openTransaction(bankId: string): Promise<Transaction> {
    return await this.add(bankId, '650c13eda7e99de7b7812ffd', 0, "Transizione apertura conto");
  }

  async list(bankId: string): Promise<Transaction[]> {
    return TransactionModel.find({ bankAccount: bankId }).sort({ createdAt: -1 });
  }
  async listAccounts(bankId: string): Promise<Transaction[]> {
    return TransactionModel.find({ bankAccount: bankId }).sort({ createdAt: -1 });
  }

  async listByNumber(bankId: string, number: number) : Promise<Transaction[]> {
    return TransactionModel.find({bankAccount: bankId}).limit(number).sort({createdAt: -1});
  }

  async listByCategory(bankId: string, number: number, category: string): Promise<Transaction[]> {
    return TransactionModel.find({ bankAccount: bankId, transactionType: category }).limit(number).sort({createdAt: -1});
  }

  async last(bankId: string): Promise<Transaction | null> {
    return TransactionModel.findOne({ bankAccount: bankId }).sort({ createdAt: -1 });
  }

  async add(bankId: string, transactionType: string, amount: number, description: string): Promise<Transaction> {
    const lastTransactionRecord = await this.last(bankId);
    const transaction = await transactionTypeService.getOne(transactionType);
    let balance = 0;

    if (transaction && lastTransactionRecord) {
      if (transaction.type === 'Uscita') {
        balance = lastTransactionRecord.balance! - amount;
      } else {
        balance = lastTransactionRecord.balance! + amount;
      }
    }

    const newTransaction = await TransactionModel.create({bankAccount: bankId, transactionType, amount, balance, description});

    return newTransaction;
  }
}

export default new TransactionService();
