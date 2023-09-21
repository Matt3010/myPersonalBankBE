import { Schema, model } from "mongoose";
import { TransactionType as iTransactionType } from "./transaction-type.entity";

const transactionTypeSchema: Schema<iTransactionType> = new Schema({
    name: String, 
    type: String
});

transactionTypeSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export const TransactionType = model<iTransactionType>("TransactionType", transactionTypeSchema);