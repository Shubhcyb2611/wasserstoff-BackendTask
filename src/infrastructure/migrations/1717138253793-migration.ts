import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717138253793 implements MigrationInterface {
    name = 'Migration1717138253793';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "bead" DROP COLUMN "currentOwner"`
        );
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "experiencePoints"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "experiencePoints" integer`
        );
        await queryRunner.query(
            `ALTER TABLE "bead" ADD "currentOwner" integer`
        );
    }
}
