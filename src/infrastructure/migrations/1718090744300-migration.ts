import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718090744300 implements MigrationInterface {
    name = 'Migration1718090744300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "batch" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "format" character varying, "originId" integer NOT NULL, CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bead" ADD "batchId" integer`);
        await queryRunner.query(`ALTER TABLE "bead" ADD CONSTRAINT "FK_1f53f7864388353ce439426d319" FOREIGN KEY ("batchId") REFERENCES "batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bead" DROP CONSTRAINT "FK_1f53f7864388353ce439426d319"`);
        await queryRunner.query(`ALTER TABLE "bead" DROP COLUMN "batchId"`);
        await queryRunner.query(`DROP TABLE "batch"`);
    }

}
