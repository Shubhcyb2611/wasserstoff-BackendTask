import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717050935441 implements MigrationInterface {
    name = 'Migration1717050935441';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "displayName" character varying`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
    }
}
