import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717483968503 implements MigrationInterface {
    name = 'Migration1717483968503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" ALTER COLUMN "ownerId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" ALTER COLUMN "ownerId" SET NOT NULL`);
    }

}
