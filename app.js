import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';

import userRouter from './Routes/user.routes.js';
import authRouter from './Routes/auth.routes.js';
import subscriptionRouter from "./Routes/subscription.routes.js";
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./Routes/workflow.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the TrackLet API!');
});

app.listen(PORT, async () => {
    console.log(`The TrackLet API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;