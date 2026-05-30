import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js'
import{ env} from './config/env.js'
import {globalErrorHandler} from './shared/errors/globalErrorHandler.js'


const app = express();;


app.use(cors(
    {
        origin: env.FRONTEND_URL
    }
));

app.use(express.json());

app.use('api/v1/auth',authRoutes);
app.use(globalErrorHandler);

export default app;