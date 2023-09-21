import { Router } from "express";
import { add } from "./transaction.controller";
import { validate } from "../../utils/validation.middleware";
import { AddTransictionDTO } from "./transaction.dto";


const router = Router();

router.post('/');
router.post('/', validate(AddTransictionDTO, 'body'), add);

export default router;