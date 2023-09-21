import { Schema, model } from "mongoose";
import { BankAccount as iBankAccount } from "./bankAccount.entity";

const bankAccountSchema: Schema<iBankAccount> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" }, 
    createdAt: { type: Date, default: Date.now },
    amount: {
      type: Number,
      default: 0
    },
    iban: {
      type: String,
      unique: true,
      required: true,
    }
  });
  
  bankAccountSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
  
  export const BankAccount = model<iBankAccount>("BankAccount", bankAccountSchema);