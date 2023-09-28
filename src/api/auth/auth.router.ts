import { Router } from "express";
import { validate } from "../../utils/middleware/validation.middleware";
import { AddUserDTO, LoginDTO, MailResetDTO } from "./auth.dto";
import { add, sendMail } from "./auth.controller";
import { login } from "./auth.service";


const router = Router();

router.post('/register', validate(AddUserDTO, 'body'), add);
router.post('/login', validate(LoginDTO, 'body'), login);
router.post('/resetPasswordEmail', validate(MailResetDTO), sendMail);
export default router;