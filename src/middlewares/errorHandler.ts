import { Request, Response, NextFunction } from "express";
import { getErrorMessage, ValidationError } from "../utils/errors";

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error)
  }

  if(error instanceof ValidationError){
    res.status(error.statusCode).json({ message: error.message })
    return;
  }

  res.status(500).json({ message: getErrorMessage(error) })
}

export default errorHandler;
