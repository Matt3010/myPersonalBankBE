import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { MobileRechargeDTO } from "./transaction.dto";
import { validate } from "../../utils/middleware/validation.middleware";
import { validateIdAndAmount } from "../../utils/middleware/combined.middleware";
import { BankAccount } from "../bankAccount/bankAccount.model";
import { mobileRecharge } from "./transaction.controller";
const router = Router();

router.use(isAuthenticated);

router.patch(':id/mobileRecharge', validate(MobileRechargeDTO), validateIdAndAmount(BankAccount), mobileRecharge);

export default router;