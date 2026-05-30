import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository.js';
import type { loginDTO, signUpDTO, refreshDTO } from './auth.types.js'
import { AppError } from '../../shared/errors/AppError.js'
import type { jwtPayLoad } from './auth.types.js'
import { env } from '../../config/env.js'
import { RefreshTokenRepository} from './refresh-token.repository.js'

export class AuthService {

    constructor(private authRepository: AuthRepository,private refreshTokenRepository: RefreshTokenRepository) { }

    private generateAccessToken(payload: jwtPayLoad) {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: '15m'
        })
    }
    private generateRefreshToken(payload: jwtPayLoad) {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: '7d'
        })
    }



   async refreshToken({refreshToken}: refreshDTO){

     try{

        const storedToken = await this.refreshTokenRepository.findToken(refreshToken);
        if(!storedToken){
            throw new AppError('Refresh Token not found',401)
        }

        const decoded  = jwt.verify(refreshToken,env.JWT_SECRET) as jwtPayLoad;
        const accessToken  = this.generateAccessToken({id : decoded.id})
        return {
            accessToken
        }
     }catch(error){
        throw new AppError('Invalid Refresh Token',401)
     }
   }


   async logout({refreshToken}: refreshDTO){
    await this.refreshTokenRepository.deleteToken(refreshToken)

    return {
        message: "Logged out successfully"
    }
   }

    async signUp(data: signUpDTO) {
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new AppError('User with this email already Exists', 400);
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.authRepository.createUser({
            ...data,
            password: hashedPassword
        });
        const accessToken = this.generateAccessToken({ id: user.id });
        const refreshToken = this.generateRefreshToken({ id: user.id });

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.refreshTokenRepository.createToken(refreshToken, user.id,expiresAt);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
            , accessToken,
            refreshToken
        };
    }


    async login(data: loginDTO) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid email or password', 400);
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid Credentials', 401);
        }
        const accessToken  = this.generateAccessToken({id:user.id});
        const refreshToken = this.generateRefreshToken({id:user.id});

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  //7 Days

        await this.refreshTokenRepository.createToken(refreshToken, user.id, expiresAt);


        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
            , accessToken,
            refreshToken
        };
    }
}