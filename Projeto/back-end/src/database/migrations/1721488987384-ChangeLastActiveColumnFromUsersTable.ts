import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class ChangeLastActiveColumnFromUsersTable1721488987384
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'last_active',
      new TableColumn({
        name: 'last_active',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'last_active',
      new TableColumn({
        name: 'last_active',
        type: 'timestamp with time zone',
        isNullable: false,
        default: 'now()',
      }),
    );
  }
}
