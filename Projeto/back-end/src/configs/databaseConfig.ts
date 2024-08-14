interface IDatabaseConfig {
  database: string;
  username: string;
  password: string;
  port: number;
  host: string;
  migrationsDir: string;
  entitiesPath: string;
}

export default {
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  migrationsDir: process.env.DATABASE_MIGRATIONS_FOLDER,
  entitiesPath: process.env.DATABASE_ENTITIES,
} as IDatabaseConfig;
