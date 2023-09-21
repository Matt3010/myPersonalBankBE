import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddTransactionTypeDTO } from "./transaction-type.dto";
import { add, list } from "./transaction-type.controller";


const router = Router();

router.post('/', validate(AddTransactionTypeDTO, 'body'), add);
router.get('/', list);


export default router;