import { IsString } from "class-validator";

export class AddTransactionTypeDTO {
    @IsString()
    name: string

    @IsString()
    type: string
}