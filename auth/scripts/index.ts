import { IUser, AuthUser } from './types';

const credentials: IUser[] = [];
let authUser: AuthUser = {isAuth: false, userData: {}}

const login = (username: string, password: string): void => {
    try {
        if (authUser.isAuth) {
            throw new Error('You are already logged in');
        }

        const findedUser = credentials.find(user => user.username === username && user.password === password);

        if (!findedUser) {
            throw new Error('Incorrect username or password');
        }

        const activeUser: IUser = {
            username,
            password,
        }

        authUser = {isAuth: true, userData: activeUser};
        console.log(`Successfully logged in ${username}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } 
    }
}

const logout = (): void => {
    try {
        if (!authUser.isAuth) {
            throw new Error('You are not logged in');
        }

        console.log(`You are logged out from ${authUser.userData.username}`);
        authUser = {isAuth: false, userData: {}};
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

const register = (username: string, password: string): void => {
    try {
        if (authUser.isAuth) {
            throw new Error('You are already logged in');
        } else if (username.length < 5) {
            throw new Error('Username must be at least 5 characters long');
        } else if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const isFindedUsername = credentials.find(user => user.username === username);
        
        if (isFindedUsername) {
            throw new Error('Username is already taken');
        }

        const createdUser: IUser = {
            username,
            password,
        }

        credentials.push(createdUser);
        authUser = {isAuth: true, userData: createdUser};

        console.log(`Successfully registered ${username}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

const whoami = (): void => {
    try {
        if (!authUser.isAuth) {
            throw new Error('You are not logged in');
        }

        console.log(`Your name is ${authUser.userData.username}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export const authController = {
    login,
    logout,
    register,
    whoami,
    credentials,
}
