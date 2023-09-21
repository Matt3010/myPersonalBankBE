import { Types } from "mongoose";
import { BankAccount } from "../bankAccount/bankAccount.entity";
import { TransactionType } from "../transaction-type/transaction-type.entity";

export interface Transaction {
	bankAccount : string | Types.ObjectId | BankAccount;
	createdAt: Date;
	balance?: number;
	amount: number;
	transactionType: string | Types.ObjectId | TransactionType;
	description: string;
}
