import * as bcrypt from 'bcrypt';
import { UserExistsError } from "../../errors/user-exists";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { User as UserModel } from "./user.model";

export class UserService {

  async add(user: User, credentials: {email: string, password: string}): Promise<User | object> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.email': credentials.email});
    if (existingIdentity) {
      return {
        message: 'User with this email already exists.'
      }
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