import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class TeamMembersTable1722822579576
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'team_members',
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
            name: 'registration',
            type: 'varchar',
            length: '155',
            isNullable: true,
          },
          {
            name: "team_id",
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
            name: 'TeamId',
            columnNames: ['team_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'teams',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('team_members');
  }
}
