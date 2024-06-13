import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718089546187 implements MigrationInterface {
    name = 'Migration1718089546187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "image" TO "content"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "content" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "content" character varying`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "content" TO "image"`);
    }

}
