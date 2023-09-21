import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import transactionRouter from './transaction-type/transaction-type.router';

const router = Router();

router.use('/users', userRouter);
router.use(authRouter);
router.use('/transaction-type', transactionRouter);

export default router;