import type {Request, Response, NextFunction} from 'express';

export const authorize = (roles: String) =>{
    return (req:Request,res:Response,next:NextFunction)=>{

        if (req.user?.role !== roles){
            return res.status(403).json({
                sucess : false,
                message : "Forbidden"
            })
        }
        next();
    }
}