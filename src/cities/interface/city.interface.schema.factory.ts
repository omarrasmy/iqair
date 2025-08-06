import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Cities } from "../db/city.entity";
import { CityResponseDto } from "../dto/find-city.dto";

export interface CityInterfaceSchemaFactory extends IEntitySchemaFactory<Cities, CityResponseDto> {
} 