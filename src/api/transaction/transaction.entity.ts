import { Types } from "mongoose";
import { BankAccount } from "../bankAccount/bankAccount.entity";

export interface Transaction {
	bankAccount : string | Types.ObjectId | BankAccount;
	createdAt: Date;
	import: number;
	transactionType: string | Types.ObjectId;
	description: string;
}
