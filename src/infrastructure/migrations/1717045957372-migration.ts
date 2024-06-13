import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717045957372 implements MigrationInterface {
    name = 'Migration1717045957372';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "_userTypes" TO "_userType"`
        );
        await queryRunner.query(
            `ALTER TYPE "public"."user__usertypes_enum" RENAME TO "user__usertype_enum"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."user__usertype_enum" RENAME TO "user__usertypes_enum"`
        );
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "_userType" TO "_userTypes"`
        );
    }
}
