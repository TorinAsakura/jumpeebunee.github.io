import { ApiError } from "../errors";
import { IUser } from "../types";

const credentials: IUser[] = [];

const login = (username: string, password: string): Promise<IUser> => {
    const findedUser = credentials.some(user => user.username === username && user.password === password);

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (findedUser) {
                res({ username, password });
            } else {
                rej(ApiError.AuthError('Incorrect username or password'));
            }
        }, 1000);
    });
};

const register = (username: string, password: string): Promise<IUser> => {
    const isFindedUsername = credentials.some(user => user.username === username);

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (!isFindedUsername) {
                res({ username, password });
                credentials.push({ username, password });
            } else {
                rej(ApiError.AuthError('Username is already taken'));
            }
        }, 1000);
    });
}

export const server = {
    login,
    register,
}