import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validateId } from "../../utils/middleware/combined.middleware";
import { getOne } from "./transaction.controller";
import { Transaction as TransactionModel } from "./transaction.model";

const router = Router();

router.use(isAuthenticated);

router.get('/:id', validateId(TransactionModel, true), getOne);

export default router;