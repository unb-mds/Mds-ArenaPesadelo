import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddRegistrationOptionalColumnToUsersTable1721489326448
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'registration',
        type: 'varchar',
        length: '155',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'registration');
  }
}
