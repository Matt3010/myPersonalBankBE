import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface BankAccount {
	id?: string;
	user: string | Types.ObjectId | User;
	createdAt: Date;
	iban: string;
}
