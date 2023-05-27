import { authController } from "..";
import { VALID_CONFIG } from "../data/data";
import { ApiError } from "../errors";
import userService from "../service/user-service";

const { register, clearAuthUser } = authController;

const validError = ApiError.ValidationError.name;

const userMin = VALID_CONFIG.username.min;
const userMax = VALID_CONFIG.username.max;
const passMin = VALID_CONFIG.password.min;
const passMax = VALID_CONFIG.password.max;

describe('Registration', () => {    
  afterEach(() => {
    clearAuthUser();
    userService.clearCredentials();
  });

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
})
