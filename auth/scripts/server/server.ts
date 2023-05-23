import { ApiError } from "../errors";
import { encryptPassword } from "../helpers/hashPassword";
import { IUser } from "../types";

const credentials: IUser[] = [];

const login = (username: string, password: string): Promise<IUser> => {
    const hashedPassword = encryptPassword(password);
    const foundUser = credentials.some(user => user.username === username && user.password === hashedPassword);

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (foundUser) {
                res({ username, password: hashedPassword });
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
                const hashedPassword = encryptPassword(password);
                res({ username, password: hashedPassword });
                credentials.push({ username, password: hashedPassword});
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
