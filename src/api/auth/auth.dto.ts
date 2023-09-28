import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IsEqualPass } from "../../utils/validator/isEqualPass.validator";
import { IsEmailInModel } from "../../utils/validator/isEmailExists.validator";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";

export class AddUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  password: string;

  @IsEqualPass('password')
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  confirmPassword: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class MailResetDTO {
  @IsEmailInModel(UserIdentityModel)
  @IsEmail()
  email: string;
}