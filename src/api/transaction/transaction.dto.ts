import { IsDate, IsDateString, IsIn, IsMobilePhone, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { IsExistsInModel } from "../../utils/auth/validator/checkIfExists.validator";
import { BankAccount as BankAccountModel} from "../bankAccount/bankAccount.model";
import { TransactionType as TransactionTypeModel } from "../transaction-type/transaction-type.model";
import { Type } from "class-transformer";
import { IsDateGreaterThan } from "../../utils/auth/validator/isDateGreaterThan.validator";

export class AddTransictionDTO {
    @IsMongoId()
    @IsExistsInModel(BankAccountModel)
    bankAccount : string;

    @IsNumber()
    @Type(() => Number)
	amount: number;

    @IsMongoId()
    @IsExistsInModel(TransactionTypeModel)
	transactionType: string;

    @IsString()
	description: string;
}

export class QueryTransactionDTO {
    @IsOptional()
    @IsString()
    @IsMongoId()
    @IsExistsInModel(TransactionTypeModel)
    type: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(25)
    @Type(() => Number)
    number: number;
    
    @IsOptional()
    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    @IsDateGreaterThan('startDate')
    endDate: string;
  }

  export class MobileRechargeDTO {
    @IsString()
    @IsIn(['Iliad', 'Vodafone', 'TIM', 'Wind Tre', 'Fastweb', 'PosteMobile', 'CoopVoce', 'Kena Mobile', 'Ho. Mobile', 'Lycamobile', 'Very Mobile', 'NoiTel', 'Daily Telecom', 'BT Italia', 'Uno Communications', 'Tiscali Mobile', 'Digi Mobil', 'NRJ Mobile'])
    operator: string;

    @IsMobilePhone('it-IT')
    mobile: string;

    @IsNumber()
    @Type(() => Number)
    @IsIn([5, 10, 15, 20, 25, 50])
	amount: number;
  }

  export class TransferDTO {
    @IsString()
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
	amount: number;

    @IsOptional()
    @IsString()
    description: string;
  }