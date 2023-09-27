import { User as UserModel } from "./user.model";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';
import { BankAccount as BankAccountModel} from "../bankAccount/bankAccount.model";

export class UserService {

  async add(user: User, credentials: {email: string, password: string}): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.email': credentials.email});
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const newUser = await UserModel.create(user);
    await UserIdentityModel.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        email: credentials.email,
        hashedPassword
      }
    })

    return newUser;
  }
  
}

export default new UserService();