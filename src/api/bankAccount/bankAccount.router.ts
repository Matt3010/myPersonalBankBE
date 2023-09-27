import { Router } from "express";
import { validate } from "../../utils/middleware/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { list } from "./bankAccount.controller";
import { add, list as listTransactions, mobileRecharge, transfer } from "../transaction/transaction.controller";
import { AddTransictionDTO, MobileRechargeDTO, QueryTransactionDTO, TransferDTO } from "../transaction/transaction.dto";
import { validateId, validateIdAndAmount } from "../../utils/middleware/combined.middleware";
import { BankAccount } from "./bankAccount.model";


const router = Router();

router.use(isAuthenticated);

router.get('/', list);
router.get('/:id/transactions', validate(QueryTransactionDTO, 'query'), validateId(BankAccount), listTransactions);
router.post('/:id/transactions', validate(AddTransictionDTO), validateIdAndAmount(BankAccount), add);
router.post('/:id/mobileRecharge', validate(MobileRechargeDTO), validateIdAndAmount(BankAccount), mobileRecharge);
router.post('/:id/transfer', validate(TransferDTO), validateIdAndAmount(BankAccount), transfer);

export default router;