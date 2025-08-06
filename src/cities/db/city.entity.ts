import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Point } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AirQualities } from "src/air_qualities/db/air_quality.entity";

@Entity()
export class Cities extends IdentifiableEntitySchema {
    @Column()
    @AutoMap()
    name: string;
    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
        select: false, // Prevents the column from being selected in queries
    })
    @AutoMap()
    location: Point
    @OneToMany(() => AirQualities, airQuality => airQuality.city)
    @AutoMap()
    airQualities: AirQualities[];
}

