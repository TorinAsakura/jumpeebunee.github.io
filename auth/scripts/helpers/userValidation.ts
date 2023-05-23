import { ApiError } from "../errors";

const checkValidity = (len: number, field: string, min: number, max: number): void => {
    if (len === 0) {
        throw ApiError.ValidationError(`${field} can't be blank`);
    } else if (len > max) {
        throw ApiError.ValidationError(`${field} is too long (maximum is ${max} characters)`);
    } else if (len < min) {
        throw ApiError.ValidationError(`${field} is too short (minimum is ${min} characters)`);
    }
}

export const userValidation = (username: string, password: string): void => {
    checkValidity(username.trim().length, "Username", 5, 30);
    checkValidity(password.trim().length, "Password", 6, 128);
}
