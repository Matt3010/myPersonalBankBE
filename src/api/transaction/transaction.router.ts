import { Router } from "express";
import { add, list, listByNumber, listByType } from "./transaction.controller";
import { validate } from "../../utils/validation.middleware";
import { AddTransictionDTO, ListFromNumberAndTypeDTO, ListFromNumberDTO } from "./transaction.dto";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validateId } from "../../utils/combined-mongoId-owner.middleware";
import { BankAccount as BankAccountModel } from "../bankAccount/bankAccount.model";

const router = Router();
router.use(isAuthenticated);

router.get('/:id', list);
router.post('/:id', validate(AddTransictionDTO, 'body'), validateId(BankAccountModel), add);
router.get('/:id/number', validate(ListFromNumberDTO), validateId(BankAccountModel), listByNumber);
router.get('/:id/category', validate(ListFromNumberAndTypeDTO), validateId(BankAccountModel), listByType);


export default router;