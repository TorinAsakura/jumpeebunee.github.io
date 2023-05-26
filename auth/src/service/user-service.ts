import { ApiError } from "../errors";
import { IUser } from "../types/types";
import * as bcrypt from 'bcrypt'

let credentials: IUser[] = [];

const login = async(username: string, password: string): Promise<IUser> => {
    const foundUser = credentials.find(user => user.username === username);
    
    if (!foundUser) throw ApiError.AuthError('User with that username does not exist');

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) throw ApiError.AuthError('Incorrect username or password');

    return { username, password: foundUser.password }
};

const register = async(username: string, password: string): Promise<IUser> => {
    const isFoundUser = credentials.some(user => user.username === username);
    const hashedPassword = await bcrypt.hash(password, 4);

    if (isFoundUser) throw ApiError.AuthError('Username is already taken');

    credentials.push({ username, password: hashedPassword });
    return { username, password: hashedPassword };
}

const clearCredentials = (): void => {
    credentials = [];
}

export const userService = {
    login,
    register,
    clearCredentials,
}
