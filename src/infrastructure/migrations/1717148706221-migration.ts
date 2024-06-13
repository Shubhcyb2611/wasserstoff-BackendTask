import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717148706221 implements MigrationInterface {
    name = 'Migration1717148706221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "distanceTravelled"`);
        await queryRunner.query(`ALTER TABLE "bead" ADD "distanceTravelled" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "distanceTravelled"`);
        await queryRunner.query(`ALTER TABLE "bead" ADD "distanceTravelled" integer`);
    }

}
