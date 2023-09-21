import { Types } from "mongoose";
import { BankAccount } from "../bankAccount/bankAccount.entity";

export interface Transaction {
	bankAccount : string | Types.ObjectId | BankAccount;
	createdAt: Date;
	balance?: number;
	amount: number;
	transactionType: string | Types.ObjectId;
	description: string;
}
