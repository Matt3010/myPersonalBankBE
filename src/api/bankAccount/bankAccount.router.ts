import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validateId, validateIdAndAmount } from "../../utils/middleware/combined.middleware";
import { validate } from "../../utils/middleware/validation.middleware";
import { add, list as listTransactions, mobileRecharge, transfer } from "../transaction/transaction.controller";
import { AddTransictionDTO, MobileRechargeDTO, QueryTransactionDTO, TransferDTO } from "../transaction/transaction.dto";
import { add as addBankAccount, deleteBankAccount, list } from "./bankAccount.controller";
import { BankAccount as BankAccountModel } from "./bankAccount.model";

const router = Router();

router.use(isAuthenticated);

router.get('/', list);
router.post('/', addBankAccount);
router.delete('/:id', validateId(BankAccountModel), deleteBankAccount);
router.get('/:id/transactions', validate(QueryTransactionDTO, 'query'), validateId(BankAccountModel), listTransactions);
router.post('/:id/transactions', validate(AddTransictionDTO), validateIdAndAmount('Transaction', BankAccountModel), add);
router.post('/:id/mobileRecharge', validate(MobileRechargeDTO), validateIdAndAmount('Mobile', BankAccountModel), mobileRecharge);
router.post('/:id/transfer', validate(TransferDTO), validateIdAndAmount('Transfer', BankAccountModel), transfer);

export default router;