export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string, name: string) {
        super(message);
        this.status = status;
        this.name = name;
    }
    
    static AuthError(message: string): ApiError {
        return new ApiError(401, message, 'AuthError');
    }

    static ValidationError(message: string): ApiError {
        return new ApiError(400, message, 'ValidationError');
    }
}
