import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717152681940 implements MigrationInterface {
    name = 'Migration1717152681940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" ADD "currentOwner" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "experiencePoints" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "experiencePoints"`);
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "currentOwner"`);
    }

}
