import { registerDecorator, ValidationOptions, ValidationArguments, isTaxId } from 'class-validator';
import mongoose, { Model } from 'mongoose';

export function IsEmailInModel(model: Model<any>,validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'IsEmailInModel',
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
          const instance = await model.findOne({ "credentials.email" : value });
          console.log(`zio pera : ${instance}`);
          return !!instance;
        },
        defaultMessage(args: ValidationArguments) {
          const [model] = args.constraints;
          return `The specified email does not exist in the ${model.modelName} Model.`;
        },
      },
    });
  };
}