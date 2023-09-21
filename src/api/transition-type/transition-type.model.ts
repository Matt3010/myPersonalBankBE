import { Schema, model } from "mongoose";
import { TransactionType as iTransitionType } from "./transition-type.entity";

const transactionTypeSchema: Schema<iTransitionType> = new Schema({
    name: String, type: String
});

transactionTypeSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export const TransactionType = model<iTransitionType>("TransactionType", transactionTypeSchema);