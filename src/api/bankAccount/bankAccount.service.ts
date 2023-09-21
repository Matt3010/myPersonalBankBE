import { BankAccount } from "./bankAccount.entity";
import { BankAccount as BankAccountModel } from "./bankAccount.model";

export class BankAccountService {
  async add(id: string): Promise<BankAccount> {
    const iban = await this.generateUniqueITIban();
    const bankAccount = (
      await BankAccountModel.create({ user: id, iban: iban.toUpperCase() })
    ).populate("user");

    return bankAccount;
  };

  private async generateUniqueITIban() {
    let iban;
    const countryCode = "IT";
    
    do {
      iban = countryCode;
      for (let i = 0; i < 25; i++) {
        iban += Math.floor(Math.random() * 10);
      }
    } while (!this.isIbanUnique(iban));
  
    return iban;
  }
  
  private async isIbanUnique(iban) {
    const existingBankAccount = await BankAccountModel.findOne({ iban: iban });
    return !existingBankAccount;
  }
  
}

export default new BankAccountService();
