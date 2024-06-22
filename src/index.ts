import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';

import userRouter from './routes';

const app: Express = express();

const port: number = Number(process.env.SERVER_PORT) || 8000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
