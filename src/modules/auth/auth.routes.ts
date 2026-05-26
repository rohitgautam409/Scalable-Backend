import {Router} from 'express';
import {AuthController} from './auth.controller.js'
import {AuthService} from './auth.service.js';
import {AuthRepository} from './auth.repository.js';
import {Validate} from '../../shared/middleware/vadlidate.js';
import {signUpSchema,loginSchema} from './auth.schema.js'

const authRouter = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/signup',Validate(signUpSchema),authController.signUp);
authRouter.post('/login',Validate(loginSchema),authController.login);

export default authRouter;