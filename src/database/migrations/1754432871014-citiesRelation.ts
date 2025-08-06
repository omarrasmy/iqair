import { MigrationInterface, QueryRunner } from "typeorm";

export class CitiesRelation1754432871014 implements MigrationInterface {
    name = 'CitiesRelation1754432871014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_2d5ad0cea3ae11e41607b61a718\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`airQualitiesId\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD CONSTRAINT \`FK_42d5ddf534c218d13d4db7e6e2c\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP FOREIGN KEY \`FK_42d5ddf534c218d13d4db7e6e2c\``);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD \`airQualitiesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_2d5ad0cea3ae11e41607b61a718\` FOREIGN KEY (\`airQualitiesId\`) REFERENCES \`air_qualities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
