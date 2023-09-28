import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import mongoose, { Model } from 'mongoose';

export function IsIbanInModel(model: Model<any>, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'IsIbanInModel',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model],
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          const instance = await model.findOne({ iban: value });
          return !!instance;
        },
        defaultMessage(args: ValidationArguments) {
          const [model] = args.constraints;
          return `The specified Iban does not exist in the ${model.modelName} Model.`;
        },
      },
    });
  };
}