import {
  MigrationInterface,
  QueryRunner,
  TableCheck,
  TableColumn,
} from "typeorm";

export default class AlterLastActiveColumnUsersTable1721613479024
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "last_active",
      new TableColumn({
        name: "last_active",
        type: "bigint",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "last_active",
      new TableColumn({
        name: "last_active",
        type: "int",
        isNullable: true,
      })
    );
  }
}
