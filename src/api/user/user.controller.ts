import { NextFunction, Response, Request } from "express";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { BankAccount as BankAccountModel} from "../bankAccount/bankAccount.model";

export const me = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await UserIdentityModel.find({user: req.user?.id!});
  const bankAccounts = await BankAccountModel.find({user: req.user?.id});

  const profile = {
    user: req.user,
    email: email[0].credentials.email,
    bankAccounts
  }
  res.json(profile);
}