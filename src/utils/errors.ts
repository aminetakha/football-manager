export const getErrorMessage = (error: unknown) => {
    if(error instanceof Error){
        return error.message;
    }

    if(error && typeof error === 'object' && 'message' in error){
        return String(error.message);
    }

    if(typeof error === 'string'){
        return error;
    }

    return "An error occurred"
}

export class ValidationError extends Error {
    statusCode: number;
    constructor({ message, statusCode }: { message: string; statusCode: number; }){
        super(message);
        this.statusCode = statusCode;
    }
}
