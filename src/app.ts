import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js'

const app = express();

app.use(cors(
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
));

app.use(express.json());

app.use('api/v1/auth',authRoutes);
app.use(globalErrorHandler);

export default app;