import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class ChampionshipRegistrationsTable1724698666696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'championship_registrations',
        columns: [
          {
            name: "id",
            type: "uuid",
            default: "uuid_generate_v4()",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'team_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'championship_id',
            type: 'uuid',
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
            name: 'TeamId',
            columnNames: ['team_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'teams',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ChampionshipId',
            columnNames: ['championship_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'championships',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('championship_registrations');
  }
}
