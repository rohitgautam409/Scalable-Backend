import type {Request, Response, NextFunction} from 'express';
import {logger} from '../logger/logger.js'


//That's the a Simple Version of Request Logger

// export const requestLogger = (req:Request,res:Response,next:NextFunction) =>{

//     logger.info({
//         method : req.method,
//         url : req.url,
//         ip : req.ip,

//     })
//     next();
// }

//That's the a Advance Version of Request Logger

export const requestLogger = (req:Request,res:Response,next:NextFunction) =>{

    const start  = Date.now();

    res.on('finish',()=>{
        const duration = Date.now() - start;

        logger.info({
            method : req.method,
            url : req.originalUrl,
            statusCode : res.statusCode,

            duration
        
        })
    })

    next();
}