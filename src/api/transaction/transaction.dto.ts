import { IsDate, IsMongoId, IsNumber, IsString } from "class-validator";
import { IsExistsInModel } from "../../utils/checkIfExists.validator";
import { BankAccount as BankAccountModel} from "../bankAccount/bankAccount.model";
import { TransactionType as TransactionTypeModel } from "../transaction-type/transaction-type.model";

export class AddTransictionDTO {
    @IsMongoId()
    @IsExistsInModel(BankAccountModel)
    bankAccount : string;

    @IsNumber()
	amount: number;

    @IsMongoId()
    @IsExistsInModel(TransactionTypeModel)
	transactionType: string;

    @IsString()
	description: string;
}

export class ListFromNumberDTO {
    @IsNumber()
    number: number;
}

export class ListFromDateDTO {
    @IsNumber()
    number: number;

    @IsDate()
    startDate : string;

    @IsDate()
    endDate : string;
}