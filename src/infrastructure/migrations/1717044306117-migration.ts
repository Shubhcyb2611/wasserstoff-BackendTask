import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717044306117 implements MigrationInterface {
    name = 'Migration1717044306117';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "profilePic" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "bio" DROP NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "bio" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "profilePic" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`
        );
    }
}
