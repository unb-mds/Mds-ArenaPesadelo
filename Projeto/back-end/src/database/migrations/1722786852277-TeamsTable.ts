import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class TeamsTable1722786852277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teams",
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
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "modality",
            type: "int",
            isNullable: false,
          },
          {
            name: "leader_id",
            type: "uuid",
            isNullable: false,
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
        foreignKeys: [
          {
            name: "LeaderId",
            columnNames: ["leader_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams');
  }
}
