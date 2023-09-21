import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import transactionTypeRouter from './transaction-type/transaction-type.router';
import transactionRouter from './transaction/transaction.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/transaction-types', transactionTypeRouter);

export default router;