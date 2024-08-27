import '../../infra/env';

import { DataSource } from "typeorm";
import databaseConfig from "../../configs/databaseConfig";

export const connection = new DataSource({
  type: 'postgres',
  database: databaseConfig.database,
  username: databaseConfig.username,
  password: databaseConfig.password,
  port: databaseConfig.port,
  migrations: [databaseConfig.migrationsDir],
  entities: [databaseConfig.entitiesPath],
});

connection.initialize()
  .then(() => console.log('💾 Database connected successfully!'))
  .catch((err) => console.log('❗Database connection failed!', err));
