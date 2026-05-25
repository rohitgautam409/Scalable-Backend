import {Router} from 'express';
import {AuthController} from './auth.controller.js'
import {AuthService} from './auth.service.js';
import {AuthRepository} from './auth.repository.js';

const authRouter = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/signup',authController.signUp);
authRouter.post('/login',authController.login);

export default authRouter;