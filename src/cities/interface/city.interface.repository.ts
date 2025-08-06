import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { Cities } from "../db/city.entity";
import { CityResponseDto } from "../dto/find-city.dto";

export interface CityInterfaceRepository extends IEntityRepository<Cities, CityResponseDto> {
    findOneBylongAndLat(options: { long: number, lat: number }): Promise<CityResponseDto>;
}