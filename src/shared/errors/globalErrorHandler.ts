import type {Request, Response, NextFunction} from 'express';
import {AppError} from './AppError.js'
import {logger} from '../logger/logger.js'


export const globalErrorHandler = (err: Error,req:Request,res:Response,next:NextFunction)=>{
     logger.error({
         message : err.message,
         stack : err.stack
     })

     if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success : false,
            message : err.message,
        })
     }
     return res.status(500).json({
        success : false,
        message : 'Internal Server Error',
     })
    }