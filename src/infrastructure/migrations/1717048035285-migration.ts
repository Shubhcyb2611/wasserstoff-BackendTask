import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717048035285 implements MigrationInterface {
    name = 'Migration1717048035285';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "bead" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "nickName" character varying, "distanceTravelled" integer, "renewalCode" character varying, "ownerId" integer NOT NULL, CONSTRAINT "PK_69160ebe55eb545a197ce84b0eb" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bead"`);
    }
}
