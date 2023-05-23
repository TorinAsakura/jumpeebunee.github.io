import { ApiError } from "../errors";
import { IUser } from "../types";

const credentials: IUser[] = [];

const login = (username: string, password: string): Promise<IUser> => {
    const foundUser = credentials.some(user => user.username === username && user.password === password);

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (foundUser) {
                res({ username, password });
            } else {
                rej(ApiError.AuthError('Incorrect username or password'));
            }
        }, 1000);
    });
};

const register = (username: string, password: string): Promise<IUser> => {
    const isFoundUser = credentials.some(user => user.username === username);

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (!isFoundUser) {
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
