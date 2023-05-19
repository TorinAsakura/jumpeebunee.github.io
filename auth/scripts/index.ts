/* eslint no-console: 0 */  // --> off console.log errors

import { IUser, AuthUser } from './types';
import { userValidation } from './helpers/userValidation';
import { errorHandle } from './helpers/errorHandle';
import { ApiError } from './errors';

const credentials: IUser[] = [];
let authUser: AuthUser = {isAuth: false, userData: {}}

const login = (username: string, password: string): void => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        }

        const findedUser = credentials.some(user => user.username === username && user.password === password);

        if (!findedUser) {
            throw ApiError.AuthError('Incorrect username or password');
        }

        const activeUser: IUser = {
            username,
            password,
        }

        authUser = {isAuth: true, userData: activeUser};
        console.log(`Successfully logged in ${username}`);
    } catch (error) {
        errorHandle(error);
    }
}

const logout = (): void => {
    try {
        if (!authUser.isAuth) {
            throw ApiError.AuthError('You are not logged in');
        }

        console.log(`You are logged out from ${authUser.userData.username}`);
        authUser = {isAuth: false, userData: {}};
    } catch (error) {
        errorHandle(error);
    }
}

const register = (username: string, password: string): void => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        } 

        userValidation(username, password);

        const isFindedUsername = credentials.some(user => user.username === username);
        
        if (isFindedUsername) {
            throw ApiError.AuthError('Username is already taken');
        }

        const createdUser: IUser = {
            username,
            password,
        }

        credentials.push(createdUser);
        authUser = {isAuth: true, userData: createdUser};

        console.log(`Successfully registered ${username}`);
    } catch (error) {
        errorHandle(error);
    }
}

const whoami = (): void => {
    try {
        if (!authUser.isAuth) {
            throw ApiError.AuthError('You are not logged in');
        }

        console.log(`Your name is ${authUser.userData.username}`);
    } catch (error) {
        errorHandle(error);
    }
}

export const authController = {
    login,
    logout,
    register,
    whoami,
    credentials,
}