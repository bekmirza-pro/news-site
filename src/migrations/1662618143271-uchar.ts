import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class uchar1662618143271 implements MigrationInterface {
  name = 'uchar1662618143271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `CREATE TABLE "${schema}"."thing_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(777) NOT NULL, CONSTRAINT "PK_70b9d8f19d9f340ddb43c4ff709" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "${schema}"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "firstname" character varying(100) NOT NULL, "lastname" character varying(100) NOT NULL, "username" character varying(77) NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "${schema}"."things" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(777) NOT NULL, "purchased_price" numeric(13,2) NOT NULL, "sold_price" numeric(13,2), "inventory" text NOT NULL, "write_off" boolean NOT NULL DEFAULT false, "write_off_date" TIMESTAMP NOT NULL, "write_off_at" TIMESTAMP, "room_id" uuid, "user_id" uuid, "thing_category_id" uuid, CONSTRAINT "UQ_5729adcf5713cc751f4a3db6533" UNIQUE ("inventory"), CONSTRAINT "PK_b19ac605b3912ed10128f2ac322" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "${schema}"."rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(700) NOT NULL, "floor" integer NOT NULL DEFAULT '1', "userIdId" uuid, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" ADD CONSTRAINT "FK_af007ee8551c72b50067dd7b1d9" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" ADD CONSTRAINT "FK_99cc250c23279262902b7416894" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" ADD CONSTRAINT "FK_69127eb60ea8173f4587c09fcc4" FOREIGN KEY ("thing_category_id") REFERENCES "thing_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."rooms" ADD CONSTRAINT "FK_0ed1cbb8745b021989ac1bb8001" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `ALTER TABLE "${schema}"."rooms" DROP CONSTRAINT "FK_0ed1cbb8745b021989ac1bb8001"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" DROP CONSTRAINT "FK_69127eb60ea8173f4587c09fcc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" DROP CONSTRAINT "FK_99cc250c23279262902b7416894"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."things" DROP CONSTRAINT "FK_af007ee8551c72b50067dd7b1d9"`,
    );
    await queryRunner.query(`DROP TABLE "${schema}"."rooms"`);
    await queryRunner.query(`DROP TABLE "${schema}"."things"`);
    await queryRunner.query(`DROP TABLE "${schema}"."users"`);
    await queryRunner.query(`DROP TABLE "${schema}"."thing_categories"`);
  }
}
