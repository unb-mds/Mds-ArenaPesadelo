import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddPhotoColumnToTeamsTable1722818448048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('teams', new TableColumn({
      name: 'photo',
      isNullable: true,
      type: 'varchar',
      length: '255',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teams', new TableColumn({
      name: 'photo',
      isNullable: true,
      type: 'varchar',
      length: '255',
    }));
  }
}
