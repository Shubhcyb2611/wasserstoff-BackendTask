import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718089100813 implements MigrationInterface {
    name = 'Migration1718089100813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" ADD "colors" text array`);
        await queryRunner.query(`ALTER TABLE "bead" ADD "isPublic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "isPublic"`);
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "colors"`);
    }

}
