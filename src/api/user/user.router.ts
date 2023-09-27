import { Router } from "express";
import { me, reset, sendMail } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { MailResetDTO, ResetPasswordDTO } from "./user.dto";
import { validate } from "../../utils/middleware/validation.middleware";
import { validateMatchPassword } from "../../utils/middleware/validate-match-password.middleware";


const router = Router();

router.get('/profile', isAuthenticated, me);
router.patch('/resetPassword', isAuthenticated, validate(ResetPasswordDTO), validateMatchPassword('body', 'oldPassword'), reset);
router.get('/email', validate(MailResetDTO), sendMail)

export default router;