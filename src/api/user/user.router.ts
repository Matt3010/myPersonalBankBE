import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validateMatchPassword } from "../../utils/middleware/validate-match-password.middleware";
import { validate } from "../../utils/middleware/validation.middleware";
import { me, reset } from "./user.controller";
import { ResetPasswordDTO } from "./user.dto";


const router = Router();

router.get('/profile', isAuthenticated, me);
router.patch('/changePassword', isAuthenticated, validate(ResetPasswordDTO), validateMatchPassword('body', 'oldPassword'), reset);

export default router;