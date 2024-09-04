import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class ChampionshipsTable1723836442764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "championships",
        columns: [
          {
            name: "id",
            type: "uuid",
            default: "uuid_generate_v4()",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: 'date_start',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'date_end',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'location_lat',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'location_lng',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'participants',
            type: 'int',
            isNullable: false,
          },
          {
            name: "modality",
            type: "int",
            isNullable: false,
          },
          {
            name: 'photo',
            isNullable: true,
            type: 'varchar',
            length: '255',
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('championships');
  }
}
