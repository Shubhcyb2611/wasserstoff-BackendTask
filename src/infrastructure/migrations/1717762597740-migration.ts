import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717762597740 implements MigrationInterface {
    name = 'Migration1717762597740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "renewal" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "beadId" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_21f9b1420be1ed5a725670a8969" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "renewal"`);
    }

}
