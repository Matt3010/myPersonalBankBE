import { Schema, model } from "mongoose";
import { Transaction as iTransiction } from "./transaction.entity";

const transactionSchema: Schema<iTransiction> = new Schema({
	bankAccount : { type: Schema.Types.ObjectId, ref: "BankAccount" }, 
  createdAt: { type: Date, default: Date.now },
  balance: Number,
  amount: Number,
	transactionType: { type: Schema.Types.ObjectId, ref: "TransactionType" }, 
	description: String
});

transactionSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});


export const Transaction = model<iTransiction>("Transaction", transactionSchema);