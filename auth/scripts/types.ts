export interface IUser {
    username: string;
    password: string;
}

export type AuthUser = {
    isAuth: boolean;
    userData: Partial<IUser>;
}