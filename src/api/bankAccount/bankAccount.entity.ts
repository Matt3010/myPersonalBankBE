import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface BankAccount {
	user: string | Types.ObjectId | User;
	createdAt: Date;
	iban: string;
}
