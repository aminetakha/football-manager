import { Request, Response, NextFunction } from "express";
import { getErrorMessage, ValidationError } from "../utils/errors";
import { isJSON } from "../utils/functions";

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error)
  }

  if(error instanceof ValidationError){
    const { result, value } = isJSON(error.message)
    res.status(error.statusCode).json({ message: result? value : error.message })
    return;
  }

  res.status(500).json({ message: getErrorMessage(error) })
}

export default errorHandler;
