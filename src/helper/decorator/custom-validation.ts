import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function CustomValidation(
    validationCallback: (value: any) => boolean,
    customErrorMessage?: string,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'customValidation',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: {
          validate(value: any, args: ValidationArguments) {
            return validationCallback(args.object);
          },
          defaultMessage(args: ValidationArguments) {
            customErrorMessage= customErrorMessage??`${args.property} is invalid.`;
            return customErrorMessage;
          },
        },
      });
    };
  }
  