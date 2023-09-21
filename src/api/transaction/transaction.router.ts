import { Router } from "express";
import { add, list, listByNumber, listByType } from "./transaction.controller";
import { validate } from "../../utils/validation.middleware";
import { AddTransictionDTO, ListFromNumberDTO } from "./transaction.dto";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();
router.use(isAuthenticated);

router.get('/:id', list);
router.post('/category/:id', validate(AddTransictionDTO, 'body'), add);
router.get('/number', validate(ListFromNumberDTO), listByNumber);
router.get('/:id', validate(ListFromNumberDTO), listByType);


export default router;