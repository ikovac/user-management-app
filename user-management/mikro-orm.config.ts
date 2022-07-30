import * as dotenv from 'dotenv';
import entities from './src/shared/database/entities';
import databaseConfig from './src/config/database.config';

dotenv.config();

export default {
  ...databaseConfig(),
  cache: { enabled: true },
  entities
};
