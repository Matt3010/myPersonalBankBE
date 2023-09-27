import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import transactionTypeRouter from './transaction-type/transaction-type.router';
import transactionRouter from './transaction/transaction.router';
import bankAccountRouter from './bankAccount/bankAccount.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/transactionTypes', transactionTypeRouter);
router.use('/bankAccounts', bankAccountRouter);

export default router;