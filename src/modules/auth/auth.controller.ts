import type {Request,Response,NextFunction} from 'express';
import {AuthService} from './auth.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { sendResponse} from '../../shared/utils/sendResponse.js'

export class AuthController{
    constructor(private authService : AuthService){}


    refreshToken = async(req:Request,res:Response,next:NextFunction)=>{
        
            const result = await this.authService.refreshToken(req.body.refreshToken);
            return res.json(result)
       
    }

    signUp = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        
            const result = await this.authService.signUp(req.body);
           return sendResponse(res,201,
            {
                success : true,
                message : 'User created successfully',
                data : result,
            }
           )
        
    })

    login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
       
            const result = await this.authService.login(req.body);
            return sendResponse(res,200,{
                success : true,
                message : 'Login successful',
                data : result,
            })
       
    })
}