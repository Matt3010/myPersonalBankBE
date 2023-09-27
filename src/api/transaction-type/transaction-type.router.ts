import { Router } from "express";
import { list } from "./transaction-type.controller";


const router = Router();

router.get('/', list);


export default router;