import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AuthRepository} from './auth.repository.js';
import type {loginDTO,signUpDTO}  from './auth.types.js'
import {AppError} from '../../shared/errors/AppError.js'
import type {jwtPayLoad} from './auth.types.js'
import {env } from '../../config/env.js'

export class AuthService {
    
    constructor(private authRepository: AuthRepository){} 

    private generateToken(payload : jwtPayLoad){
        return jwt.sign(payload,env.JWT_SECRET,{expiresIn : '1d'});
    }



    async signUp(data :signUpDTO){
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if(existingUser){
            throw new AppError('User with this email already Exists',400);
        }
        const hashedPassword = await bcrypt.hash(data.password,10);
        const user = await this.authRepository.createUser({
            ...data,
            password : hashedPassword
        });
        const token = this.generateToken({id : user.id});
        return {
            user: {
                id : user.id,
                email : user.email,
                name : user.name,
            }
            , token};
    }


    async login(data :loginDTO){
        const user = await this.authRepository.findUserByEmail(data.email);
        if(!user){
            throw new AppError('Invalid email or password',400);
        }
        const isPasswordValid = await  bcrypt.compare(data.password,user.password);
        if(!isPasswordValid){
            throw new AppError('Invalid Credentials',401);
        }
        const token = this.generateToken({id:user.id});
        return {
            user: {
                id : user.id,
                email : user.email,
                name : user.name,
            }
            ,token};
    }
}