import jwt from 'jsonwebtoken';
import type {Request, Response,NextFunction} from 'express';
import {env} from '../../config/env.js'
import type { jwtPayLoad } from '../../modules/auth/auth.types.js';

export const authenticate =(req:Request,res:Response,next:NextFunction) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message : 'Unauthorized'
            })
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message : 'Unauthorized'
            })
        }
        

        const verifyAccessToken =(token:string): jwtPayLoad =>{
            const decoded = jwt.verify(token,env.JWT_SECRET);
            return decoded as jwtPayLoad
        }
        req.user = verifyAccessToken(token)

        next();
    } catch(error){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }
} 