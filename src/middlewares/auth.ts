import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.user){
        next();
    }else{
        next(new Error('User is not authenticated'));
    }
}