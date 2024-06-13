import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717140195965 implements MigrationInterface {
    name = 'Migration1717140195965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "image" character varying, "description" character varying, "userId" integer, "locationId" integer, "beadId" integer, CONSTRAINT "REL_ba07795b0c8471bfdf0cb687ed" UNIQUE ("locationId"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ba07795b0c8471bfdf0cb687eda" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_d7a3ecc30e4cc79ac8dd7d94d7b" FOREIGN KEY ("beadId") REFERENCES "bead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_d7a3ecc30e4cc79ac8dd7d94d7b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ba07795b0c8471bfdf0cb687eda"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
