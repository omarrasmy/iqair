import { MigrationInterface, QueryRunner } from "typeorm";

export class Cities1754431585269 implements MigrationInterface {
    name = 'Cities1754431585269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`location\` geometry NOT NULL, \`airQualitiesId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`cityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_2d5ad0cea3ae11e41607b61a718\` FOREIGN KEY (\`airQualitiesId\`) REFERENCES \`air_qualities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_2d5ad0cea3ae11e41607b61a718\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`cityId\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`location\` geometry NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`cities\``);
    }

}
