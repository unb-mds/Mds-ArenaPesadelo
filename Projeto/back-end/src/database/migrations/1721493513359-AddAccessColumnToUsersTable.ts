import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddAccessColumnToUsersTable1721493513359
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'access',
        type: 'int',
        default: '1',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'access');
  }
}
