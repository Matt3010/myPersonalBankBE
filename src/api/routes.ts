import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import transactionTypeRouter from './transaction-type/transaction-type.router';
import bankAccountRouter from './bankAccount/bankAccount.router';
import ipAddressRouter from './ip-address/ip-address.router';
import transactionRouter from './transaction/transaction.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/transactionTypes', transactionTypeRouter);
router.use('/bankAccounts', bankAccountRouter);
router.use('/ip-address', ipAddressRouter);
router.use('/transactions', transactionRouter);

export default router;