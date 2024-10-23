import express, { Request, Response, NextFunction } from 'express';

import { configObject } from './config';

const app = express();

app.use(express.json());

app.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = {};

    res.status(200).json({ message: 'successors', data: result });
  } catch (error) {}
});

app.listen(configObject.PORT, () =>
  console.log(`service run on port ${configObject.PORT}`)
);
