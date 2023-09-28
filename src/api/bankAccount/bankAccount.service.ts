import { TransactionType } from "../transaction-type/transaction-type.model";
import { BankAccount } from "./bankAccount.entity";
import { BankAccount as BankAccountModel } from "./bankAccount.model";
import { generateUniqueITIban } from "../../utils/ibanGenerator";

export class BankAccountService {

  async getOne(id: string) : Promise<BankAccount> {
    const bankAccount = await BankAccountModel.findById(id).populate('user');
    return bankAccount!;
  }

  async getByIban(iban: string) : Promise<BankAccount> {
    const bankAccount = await BankAccountModel.findOne({iban}).populate('user');
    return bankAccount!;
  }

  async add(id: string): Promise<BankAccount> {
    const iban = await generateUniqueITIban();
    const bankAccount = await BankAccountModel.create({ user: id, iban: iban.toUpperCase() });
    await bankAccount.populate("user");
    return bankAccount;
  };
  
  async isIbanUnique(iban: string): Promise<boolean> {
    const existingBankAccount = await BankAccountModel.findOne({ iban });
    return !existingBankAccount;
  }

  async get(user: string): Promise<BankAccount[]> {
    const bankAccount = await BankAccountModel.find({user});
    return bankAccount;
  }
}

export default new BankAccountService();
