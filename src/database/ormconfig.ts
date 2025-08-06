import { DataSource, DataSourceOptions, createConnection } from 'typeorm';

// Check typeORM documentation for more information.
import * as path from 'path';
import * as dotenv from 'dotenv';
import entities from './entities/entities';

import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { SeederOptions } from 'typeorm-extension';
import CitiesSeeder from './seeding/cities.seeder';

const env = process.env.NODE_ENV || 'development';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  throw new Error(`.env file not found at ${dotenv_path}`);
}

initializeTransactionalContext()
patchTypeORMRepositoryWithBaseRepository()

const conf: DataSourceOptions & SeederOptions = {
  type: 'mysql' as any,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD as string,
  host: process.env.TYPEORM_HOST,
  entities: Object.values(entities),
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [path.resolve(__dirname + '/migrations/**/*{.ts,.js}')],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
  seeds: [
    CitiesSeeder
  ],
  seedTracking: true
};
createConnection(conf)
const dataSource = new DataSource(conf);
export const config = conf;
export default dataSource;