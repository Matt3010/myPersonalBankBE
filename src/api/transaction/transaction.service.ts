import { FilterQuery } from "mongoose";
import transactionTypeService from "../transaction-type/transaction-type.service";
import { QueryTransactionDTO } from "./transaction.dto";
import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";

export class TransactionService {
  async openTransaction(bankId: string): Promise<Transaction> {
    return this.add(
      bankId,
      "650c13eda7e99de7b7812ffd",
      0,
      "Transizione apertura conto"
    );
  }

  async find(
    bankAccount: string,
    query: QueryTransactionDTO
  ): Promise<Transaction[]> {
    const q: FilterQuery<Transaction> = { bankAccount };

    if (query.type) {
      q.transactionType = query.type;
    }

    if (query.startDate !== undefined || query.endDate !== undefined) {
      q.createdAt = {};
    }

    if (query.startDate) {
      q.createdAt["$gte"] = new Date(query.startDate);
    }

    if (query.endDate) {
      q.createdAt["$lte"] = new Date(query.endDate);
    }

    const list = await TransactionModel.find(q)
      .limit(query.number || 0)
      .sort({ createdAt: -1 })
    return list;
  }

  async listAccounts(bankId: string): Promise<Transaction[]> {
    return await TransactionModel.find({ bankAccount: bankId }).sort({
      createdAt: -1,
    });
  }

  async last(bankAccount: string): Promise<Transaction | null> {
    return await TransactionModel.findOne({ bankAccount }).sort({
      createdAt: -1,
    });
  }

  async getOne(id: string): Promise<Transaction | null> {
    return await TransactionModel.findById(id);
  }

  async add(
    bankId: string,
    transactionType: string,
    amount: number,
    description: string
  ): Promise<Transaction> {
    const lastTransactionRecord = await this.last(bankId);
    const transaction = await transactionTypeService.getOne(transactionType);
    let balance = 0;

    if (transaction && lastTransactionRecord) {
      balance =
        transaction.type === "Uscita"
          ? lastTransactionRecord.balance! - amount
          : lastTransactionRecord.balance! + amount;
    }

    const newTransaction = await TransactionModel.create({
      bankAccount: bankId,
      transactionType,
      amount,
      balance,
      description,
    });

    return await newTransaction.populate(['bankAccount', 'transactionType']);
  }

  async transfer(
    bankAccountRecipient: string,
    bankAccountSender: string,
    amount: number,
    description: string
  ) {
    await this.add(
      bankAccountSender,
      "650c1425a7e99de7b7813003",
      amount,
      description
    );
    await this.add(
      bankAccountRecipient,
      "650c13f8a7e99de7b7812fff",
      amount,
      description
    );
  }
}

export default new TransactionService();
