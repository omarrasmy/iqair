import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import entities from 'src/database/entities/entities';
import { Repository } from 'typeorm';
@ValidatorConstraint({ name: 'PropertyExists', async: true })
class PropertyExistsConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
  const [{tableName,entityNames,propertyName,addtionalProprties,skipPropertyIf}] = args.constraints;    
    let keys = Object.keys(skipPropertyIf);
    let count = 0;
    for(let key of keys){      
      if((args.object as any)[key] == skipPropertyIf[key])
        ++count;
    }    
    if(count != keys.length && keys.length != 0){
      return true;
    }
    let where = {where:{}}
    if(entityNames[0].includes('Id')){
      where.where={[(entityNames[0].split('Id'))[0]]:{id:value}}
    }else{
      where.where={[entityNames[0]]:value}
    }
    
    let addtionalProprtiesCount = 0
    for(let i=1;i<entityNames.length;i++){
      let addedValue=((args.object as any)[addtionalProprties[addtionalProprtiesCount]])??null
      if(entityNames[i].includes('Id')){
        where.where[(entityNames[i].split('Id'))[0]]={id:addedValue}
      }
      else{
        where.where[entityNames[i]]=addedValue
      }
      ++addtionalProprtiesCount;
    }    
    const repository = entities[tableName] as Repository<any>;
    const entity = await repository.findOne(where);           
    return !entity;
  }

  defaultMessage(args: ValidationArguments) {
    const [{propertyName}] = args.constraints;
    return `${propertyName} Already Exists.`;
  }
}

export function PropertyExists(tableName: string,entityNames:Array<string>,addtionalProprties:Array<string>=[],skipPropertyIf:object={}, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [{tableName,entityNames,propertyName,addtionalProprties,skipPropertyIf}],
      validator: PropertyExistsConstraint,
    });
  };
}