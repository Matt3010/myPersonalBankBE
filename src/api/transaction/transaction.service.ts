import bankAccountService from "../bankAccount/bankAccount.service";
import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";

export class TransactionService {
  async firstTransaction(bankId: string): Promise<Transaction> {
    const first = await this.add(bankId, '650c0c6910ac8ccaff89a444', 0, "Transizione apertura conto");
    return first;
  }

  async add(
    bankId: string,
    transactionType: string,
    importo: number,
    description: string
  ): Promise<Transaction> {
    const newTransaction = (
      await TransactionModel.create({
        bankAccount: bankId,
        transactionType,
        import: importo,
        description,
      })
    ).populate(["bankAccount", "transactionType"]);
    await bankAccountService.updateAmount(bankId, importo, transactionType);

    return newTransaction;
  }
}

export default new TransactionService();
