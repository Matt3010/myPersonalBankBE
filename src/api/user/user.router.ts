import { Router } from "express";
import { me } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.use(isAuthenticated);

router.get('/profile', me);
router.patch('/resetPassword', reset);

export default router;