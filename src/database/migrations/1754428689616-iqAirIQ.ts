import { MigrationInterface, QueryRunner } from "typeorm";

export class IqAirIQ1754428689616 implements MigrationInterface {
    name = 'IqAirIQ1754428689616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`pollutionLevel\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`pollutionLevelUS\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`pollutionLevelChina\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`pollutionLevelChina\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` DROP COLUMN \`pollutionLevelUS\``);
        await queryRunner.query(`ALTER TABLE \`air_qualities\` ADD \`pollutionLevel\` varchar(255) NOT NULL`);
    }

}
