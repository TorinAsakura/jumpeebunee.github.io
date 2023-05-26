import { authController } from "..";
import { ApiError } from "../errors";
import userService from "../service/user-service";

const DEFAULT_NAME = 'Dmitry';
const DEFAULT_PASS = '123123123';

const authError = ApiError.AuthError.name;

const { register, login, logout, clearAuthUser } = authController;


describe('Authorization', () => {
    afterEach(() => {
        clearAuthUser();
        userService.clearCredentials();
    });

    test('Should return error if user is already auth', async() => {
      await register(DEFAULT_NAME, DEFAULT_PASS);
  
      const data = await login(DEFAULT_NAME, DEFAULT_PASS);
      expect(data).toEqual(`${authError}: You are already logged in`);
    })
    test('Should return error is user not found', async() => {
      const data = await login(DEFAULT_NAME, DEFAULT_PASS);
      expect(data).toEqual(`${authError}: User with that username does not exist`);
    })
    test('Should return error if password is incorrect', async() => {
      await register(DEFAULT_NAME, DEFAULT_PASS);
      logout();
  
      const data = await login(DEFAULT_NAME, `${DEFAULT_PASS}123`);
      expect(data).toEqual(`${authError}: Incorrect username or password`);
    })
    test('Should login and register', async() => {
      await register(DEFAULT_PASS, DEFAULT_PASS);
      logout();
  
      const data = await login(DEFAULT_PASS, DEFAULT_PASS);
      expect(data).toEqual(`Successfully logged in ${DEFAULT_PASS}`);
    })
  })
  