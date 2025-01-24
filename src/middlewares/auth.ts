import { NextFunction, Request, Response } from "express";
import { isValidEmail, isValidPassword } from "../utils/functions";
import { ValidationError } from "../utils/errors";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.user){
        next();
    }else{
        next(new Error('User is not authenticated'));
    }
}

export const validateInputs = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors: { email?: string; password?: string } = {};
    if(!email){
        errors.email = 'Email is required.';
    }
    if(email && !isValidEmail(email)){
        errors.email = 'Please provide a valid email.'
    }
    if(!password){
        errors.password = 'Password is required.';
    }
    if(password && !isValidPassword(password)){
        errors.password = 'Password must have more than 8 characters with lower case, upper case, numbers, and symbols.'
    }

    if(errors.email || errors.password){
        next(new ValidationError({ statusCode: 400, message: JSON.stringify(errors) }));
        return;
    }
    next();
}