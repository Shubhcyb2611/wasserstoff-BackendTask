import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717068906400 implements MigrationInterface {
    name = 'Migration1717068906400';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "trade" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "gainedXp" integer, "supplierBeadId" integer NOT NULL, "receiverBeadId" integer NOT NULL, "supplierId" integer NOT NULL, "receiverId" integer NOT NULL, CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trade"`);
    }
}
