import { AuthUser } from './types/types';
import { userValidation } from './helpers/userValidation';
import { errorHandle } from './helpers/errorHandle';
import { ApiError } from './errors';
import userService from './service/user-service';

let authUser: AuthUser = {isAuth: false, userData: {}};

const login = async(username: string, password: string): Promise<string> => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        }

        const activeUser = await userService.login(username, password);

        authUser = {isAuth: true, userData: activeUser};
        return `Successfully logged in ${username}`;
    } catch (error) {
        return errorHandle(error);
    }
}

const logout = (): string => {
    try {
        if (!authUser.isAuth) {
            throw ApiError.AuthError('You are not logged in');
        }

        authUser = {isAuth: false, userData: {}};
        return `You are logged out from account`;
    } catch (error) {
        return errorHandle(error);
    }
}

const register = async(username: string, password: string): Promise<string> => {
    try {
        if (authUser.isAuth) {
            throw ApiError.AuthError('You are already logged in');
        } 

        userValidation(username, password);

        const createdUser = await userService.register(username, password);

        authUser = {isAuth: true, userData: createdUser};
        return `Successfully registered ${username}`;
    } catch (error) {
        return errorHandle(error);
    }
}

const whoami = (): string => {
    try {
        if (!authUser.isAuth) {
            throw ApiError.AuthError('You are not logged in');
        }

        return `Your name is ${authUser.userData.username}`;
    } catch (error) {
        return errorHandle(error);
    }
}

const clearAuthUser = () => {
    authUser = {isAuth: false, userData: {}};
}
 
export const authController = {
    login,
    logout,
    register,
    whoami,
    clearAuthUser
}
