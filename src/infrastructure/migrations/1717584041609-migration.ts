import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717584041609 implements MigrationInterface {
    name = 'Migration1717584041609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" ADD "passCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "passCode"`);
    }

}
