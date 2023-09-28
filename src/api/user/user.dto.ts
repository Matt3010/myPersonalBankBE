import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IsDiffFromOld } from "../../utils/validator/isDiffFromOldPass.validator";

export class ResetPasswordDTO {
@MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  oldPassword: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  @IsDiffFromOld('oldPassword')
  newPassword: string;
}