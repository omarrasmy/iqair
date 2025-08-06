import { ValidationOptions, ValidateBy, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

// export function IsArrayOfValidAndUnique(options: { type: string } & ValidationOptions): PropertyDecorator {
//   return (object: Record<string, any>, propertyName: string) => {
//     ValidateBy(
//       {
//         name: 'isArrayOfValidAndUnique',
//         constraints: [options.type],
//         validator: {
//           validate(value: any, args: ValidationArguments) {
//             if (!Array.isArray(value)) {
//               return false;
//             }

//             const seen = new Set();

//             for (const item of value) {
//               let key: string;
//               if (options.type === 'date') {
//                 key = new Date(item).getTime().toString();
//               } else  {
//                 key = item.toString();
//               }
//               if (seen.has(key)) {
//                 return false;
//               }
//               seen.add(key);
//             }

//             return true;
//           },
//         },
//       },
//       options // Pass options directly
//     )(object, propertyName);
//   };
// }
@ValidatorConstraint({ name: 'isArrayOfValidAndUnique', async: true })
class IsArrayOfValidAndUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value, args: ValidationArguments) {
    const [type] = args.constraints;

    if (!Array.isArray(value)) {
      return false;
    }

    const seen = new Set();
    for (const item of value) {
      let key: string;
      
      if (type === 'date') {
        key = new Date(item).getTime().toString();
      } else  {
        key = item.toString();
      }
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
    }

    return true;
  }
  
  defaultMessage(args: ValidationArguments) {
    return `Each item in the array should be unique.`;
  }
  }


export function IsArrayOfValidAndUnique(type: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [type, propertyName],
      validator: IsArrayOfValidAndUniqueConstraint,
    });
  };
}