import type {Request,Response,NextFunction} from 'express';
import {AuthService} from './auth.service.js';

export class AuthController{
    constructor(private authService : AuthService){}

    signUp = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = await this.authService.signUp(req.body);
            return res.status(200).json({
                success : true,
                data : result,
            })
        }catch(error){
            next(error);
        }
    }

    login = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = await this.authService.login(req.body);
        return res.status(200).json({
            success : true,
            data :result,
        })
        }catch(error){
            next(error);
        }
    }
}