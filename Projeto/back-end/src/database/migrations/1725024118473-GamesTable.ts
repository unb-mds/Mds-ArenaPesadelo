import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class GamesTable1725024118473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: "id",
            type: "uuid",
            default: "uuid_generate_v4()",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'home',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'visitor',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'home_score',
            type: 'int',
            isNullable: false,
            default: '0',
          },
          {
            name: 'visitor_score',
            type: 'int',
            isNullable: false,
            default: '0',
          },
          {
            name: 'cardinal',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'phase',
            type: 'int',
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
            name: 'HomeId',
            columnNames: ['home'],
            referencedColumnNames: ['id'],
            referencedTableName: 'teams',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'VisitorId',
            columnNames: ['visitor'],
            referencedColumnNames: ['id'],
            referencedTableName: 'teams',
            onDelete: 'SET NULL',
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
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('games');
  }
}
