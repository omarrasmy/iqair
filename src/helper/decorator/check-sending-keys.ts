import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions, isUUID } from 'class-validator';
import { UUID } from 'crypto';
import entities from 'src/database/entities/entities';
import { In, Repository } from 'typeorm';
import { EntitiesEnum } from '../enums/entities.enum';
@ValidatorConstraint({ name: 'idExists', async: true })
class IdExistsConstraint implements ValidatorConstraintInterface {
  async validate(id: UUID, args: ValidationArguments) {
    const [tableNames] = args.constraints;
    for (const tableName of tableNames) {
      const repository = entities[tableName] as Repository<any>;
      if (Array.isArray(id)) {
        const entities = await repository.find({ where: { id: In(id) } });
        if (entities.length == id.length) {
          return true; // Return true if the ID exists in at least one of the tables
        }
      }
      else if (isUUID(id)) {
        const entity = await repository.findOne({ where: { id } });
        if (entity) {
          return true; // Return true if the ID exists in at least one of the tables
        }
      }
    }
    return false; // Return false if the ID doesn't exist in any of the tables
  }

  defaultMessage(args: ValidationArguments) {
    const [tableNames, propertyName] = args.constraints;
    return `${propertyName.split('sId')[0]} not found`;
  }
}

export function IdExists(tableNames: EntitiesEnum[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [tableNames, propertyName],
      validator: IdExistsConstraint,
    });
  };
}