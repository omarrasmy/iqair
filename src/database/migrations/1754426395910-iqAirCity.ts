import { MigrationInterface, QueryRunner } from "typeorm";

export class IqAirCity1754426395910 implements MigrationInterface {
    name = 'IqAirCity1754426395910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`air_qualities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`city\` varchar(255) NOT NULL, \`pollutionLevel\` varchar(255) NOT NULL, \`recordedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`location\` geometry NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`air_qualities\``);
    }

}
