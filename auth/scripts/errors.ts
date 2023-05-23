export class ApiError extends Error {
    status: number;

    /**
     * Creates a new instance of the ApiError class.
     * @param {number} status - HTTP error status code.
     * @param {string} message - Message about the error.
     * @param {string} name - Error name.
     */
    constructor(status: number, message: string, name: string) {
        super(message);    
        this.status = status;
        this.name = name;
    }

    // Creates an ApiError instance with code 401 when an error occurs in user authorization.
    static AuthError(message: string): ApiError {
        return new ApiError(401, message, 'AuthError');
    }

    // Creates an ApiError instance with code 400 when a user data validation error occurs.
    static ValidationError(message: string): ApiError {
        return new ApiError(400, message, 'ValidationError');
    }
}
