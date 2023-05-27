import { VALID_CONFIG } from "../data/data";
import { ApiError } from "../errors";

const checkValidity = (input: string, field: string, min: number, max: number): void => {
    if (input.length === 0) {
        throw ApiError.ValidationError(`${field} can't be blank`);
    } else if (input.length > max) {
        throw ApiError.ValidationError(`${field} is too long (maximum is ${max} characters)`);
    } else if (input.length < min) {
        throw ApiError.ValidationError(`${field} is too short (minimum is ${min} characters)`);
    }
}

export const userValidation = (username: string, password: string): void => {
    checkValidity(username.trim(), "Username", VALID_CONFIG.username.min, VALID_CONFIG.username.max);
    checkValidity(password.trim(), "Password", 6, 128);
}
