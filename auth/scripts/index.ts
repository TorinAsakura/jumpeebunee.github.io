/* eslint no-console: 0 */  // --> off console.log errors

import { AuthUser } from './types';
import { userValidation } from './helpers/userValidation';
import { errorHandle } from './helpers/errorHandle';
import { ApiError } from './errors';
import { server } from './server/server';
import * as bcrypt from 'bcrypt';

let authUser: AuthUser = {isAuth: false, userData: {}}

const login = async(username: string, password: string): Promise<void> => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        }

        const activeUser = await server.login(username, password)   ;

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

const register = async(username: string, password: string): Promise<void> => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        } 

        userValidation(username, password);

        const createdUser = await server.register(username, password);

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
}
