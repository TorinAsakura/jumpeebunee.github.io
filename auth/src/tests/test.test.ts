import { VALID_CONFIG } from "../data/data";
import { ApiError } from "../errors";
import { authController } from "../index";
import userService from "../service/user-service";

const { register, login, clearAuthUser, logout, whoami } = authController;

const validError = ApiError.ValidationError.name;
const authError = ApiError.AuthError.name;

const DEFAULT_NAME = 'Dmitry';
const DEFAULT_PASS = '123123123';

afterEach(() => {
  clearAuthUser();
  userService.clearCredentials();
});

describe('Registration', () => {
  const userMin = VALID_CONFIG.username.min;
  const userMax = VALID_CONFIG.username.max;
  const passMin = VALID_CONFIG.password.min;
  const passMax = VALID_CONFIG.password.max;
  
  test(`Should return error if username shorter than ${userMin} characters`, async() => {
    const username = 's'.repeat(userMin - 1);
    const password = 's'.repeat(passMin + 1);

    const data = await register(username, password);
    expect(data).toEqual(`${validError}: Username is too short (minimum is ${userMin} characters)`);
  });
  test(`Should return error if username bigger than ${userMax} characters`, async() => {
    const username = 'b'.repeat(userMax + 1);
    const password = 's'.repeat(passMin + 1);

    const data = await register(username, password);
    expect(data).toEqual(`${validError}: Username is too long (maximum is ${userMax} characters)`);
  });
  test(`Should return error if password shorter than ${passMin} characters`, async() => {
    const username = 's'.repeat(userMin + 1);
    const password = 's'.repeat(passMin - 1);

    const data = await register(username, password);
    expect(data).toEqual(`${validError}: Password is too short (minimum is ${passMin} characters)`);
  });
  test(`Should return error if password bigger than ${userMin} characters`, async() => {
    const username = 's'.repeat(userMin + 1);
    const password = 's'.repeat(passMax + 1);

    const data = await register(username, password);
    expect(data).toEqual(`${validError}: Password is too long (maximum is ${passMax} characters)`);
  });
  test(`Should register with valid name and password`, async() => {
    const username = 's'.repeat(userMin + 1);
    const password = 's'.repeat(passMin + 1);
    const data = await register(username, password);
    expect(data).toEqual(`Successfully registered ${username}`);
  });
});

describe('Authorization', () => {
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