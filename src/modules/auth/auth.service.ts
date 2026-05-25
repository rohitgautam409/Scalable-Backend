import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AuthRepository} from './auth.repository.js';
import type {loginDTO,signUpDTO}  from './auth.types.js'
import {AppError} from '../../shared/errors/AppError.js'


export class AuthService {
    
    constructor(private authRepository: AuthRepository){}

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
        const token = jwt.sign({id :user.id},process.env.JWT_SECRET,{expiresIn : `7d`})
        return {user, token};
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
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn : '7d'})
        return {user,token};
    }
}