import express from 'express';
import config from './configs/config';
import userRouter from './routes/userRoutes';
const app = express();

app.use(express.json());

app.use(userRouter)

app.listen(config.port);