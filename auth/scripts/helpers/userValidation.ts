import { VALID_CHARACTERS } from "../data/data";
import { ApiError } from "../errors";

const checkValidity = (input: string, field: string, min: number, max: number): void => {
    if (input.length === 0) {
        throw ApiError.ValidationError(`${field} can't be blank`);
    } else if (input.length > max) {
        throw ApiError.ValidationError(`${field} is too long (maximum is ${max} characters)`);
    } else if (input.length < min) {
        throw ApiError.ValidationError(`${field} is too short (minimum is ${min} characters)`);
    }

    input.split('').forEach(item => {
        if (!VALID_CHARACTERS.includes(item.toLocaleLowerCase())) {
            throw ApiError.ValidationError(`${field} contains invalid characters (use only A-Z and 0-9)`);
        }
    })

}

export const userValidation = (username: string, password: string): void => {
    checkValidity(username.trim(), "Username", 5, 30);
    checkValidity(password.trim(), "Password", 6, 128);
}
