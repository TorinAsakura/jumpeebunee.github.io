import { ApiError } from "../errors";
import { authController } from "../index";
import userService from "../service/user-service";

const { register, clearAuthUser, logout, whoami } = authController;

const authError = ApiError.AuthError.name;

const DEFAULT_NAME = 'Dmitry';
const DEFAULT_PASS = '123123123';

afterEach(() => {
  clearAuthUser();
  userService.clearCredentials();
});

describe('Logout', () => {
  test('Should logout', async() => {
    await register(DEFAULT_NAME, DEFAULT_PASS);

    const data = logout();
    expect(data).toEqual(`You are logged out from account`);
  })
  test('Should return error if user is not logged in', async() => {
    const data = logout();
    expect(data).toEqual(`${authError}: You are not logged in`);
  })
})

describe('Whoami', () => {
  test('Should display name if user is auth', async() => {
    await register(DEFAULT_NAME, DEFAULT_PASS);

    const data = whoami();
    expect(data).toEqual(`Your name is ${DEFAULT_NAME}`);
  })
  test('Should return error if user is not logged in', async() => {
    const data = whoami();
    expect(data).toEqual(`${authError}: You are not logged in`);
  })
})