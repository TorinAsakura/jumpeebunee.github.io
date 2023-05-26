import { ApiError } from "../errors";
import { IUser } from "../types/types";
import * as bcrypt from 'bcrypt'

class UserService {

    credentials: IUser[] = [];

    async login(username: string, password: string): Promise<IUser> {
        const foundUser = this.credentials.find(user => user.username === username);
    
        if (!foundUser) throw ApiError.AuthError('User with that username does not exist');
    
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) throw ApiError.AuthError('Incorrect username or password');
    
        return { username, password: foundUser.password }
    }

    async register(username: string, password: string): Promise<IUser> {
        const isFoundUser = this.credentials.some(user => user.username === username);
        const hashedPassword = await bcrypt.hash(password, 4);
    
        if (isFoundUser) throw ApiError.AuthError('Username is already taken');
    
        this.credentials.push({ username, password: hashedPassword });
        return { username, password: hashedPassword };
    }

    clearCredentials(): void {
        this.credentials = [];
    }
}

export default new UserService();