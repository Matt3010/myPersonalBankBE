import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { list } from "./ip-address.controller";

const router = Router();

router.use(isAuthenticated);

router.get('/', list);

export default router;