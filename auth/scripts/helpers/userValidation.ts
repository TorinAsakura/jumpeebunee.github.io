import { ApiError } from "../errors";

export const userValidation = (username: string, password: string): void => {
    if (username.length < 5) {
        throw ApiError.ValidationError('Username must be at least 5 characters long');
    } else if (password.length < 6) {
        throw ApiError.ValidationError('Password must be at least 6 characters long');
    }
}