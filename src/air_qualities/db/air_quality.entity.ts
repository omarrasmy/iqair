import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Point } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Cities } from "src/cities/db/city.entity";

@Entity()
export class AirQualities extends IdentifiableEntitySchema {

    @Column()
    @AutoMap()
    pollutionLevelUS: number;

    @Column()
    @AutoMap()
    pollutionLevelChina: number;

    @CreateDateColumn()
    @AutoMap()
    recordedAt: Date;

    @AutoMap()
    @ManyToOne(() => Cities, city => city.airQualities, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    city: Cities;
    @AutoMap()
    @Column()
    cityId: number;

}

