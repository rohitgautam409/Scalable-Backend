import {Router} from 'express';
import {AuthController} from './auth.controller.js'
import {AuthService} from './auth.service.js';
import {AuthRepository} from './auth.repository.js';
import {Validate} from '../../shared/middleware/vadlidate.js';
import {signUpSchema,loginSchema, refreshSchema} from './auth.schema.js'
import {authenticate} from '../../shared/middleware/auth.middleware.js'
import { RefreshTokenRepository } from './refresh-token.repository.js'

const authRouter = Router();

const authRepository = new AuthRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = new AuthService(authRepository,refreshTokenRepository);
const authController = new AuthController(authService);


//Define Routes for authentication Signup and Login
authRouter.post('/signup',Validate(signUpSchema),authController.signUp);
authRouter.post('/login',Validate(loginSchema),authController.login);

//Route for Refreshing Access Token  using Refresh Token
authRouter.post('/refresh',Validate(refreshSchema),authController.refreshToken);

//Protected Route to get user details
authRouter.get('/me',authenticate,(req,res)=>{
    res.json({
        success : true,
        user : req.user
    })
})


export default authRouter;