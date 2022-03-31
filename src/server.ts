import express from 'express';
import config from './configs/config';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes';
const app = express();

app.use(express.json());

app.use('/user',userRouter)
app.use('/post',postRouter)

app.listen(config.port);