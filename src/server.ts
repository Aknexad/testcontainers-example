import express from 'express';

import { PORT } from './config';
import { databaseConnection } from './database';
import router from './routers';

async function start() {
  const app = express();

  app.use(express.json());

  await databaseConnection.connectToDatabase();

  app.use(router());

  app.listen(PORT, () => console.log(`service run on port ${PORT}`));
}

start();
