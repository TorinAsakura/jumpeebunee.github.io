/* eslint no-console: 0 */  // --> off console.log errors

import { authController } from "../index";

const { whoami, logout, register, login } = authController;

async function test(): Promise<void> {
    whoami();
    logout();
    await register('Dmitry', '           qwe                       ');
    await register('Dmitry', '                 ');
    await register('Dmitry', 'qwerty');
    whoami();
    await login('Dmitry', 'qwerty');
    await register('Dmitry', 'qwerty');
    logout();
    await login('Dmitry', 'qwerty1');
    await login('Dmitry', 'qwerty');
    logout();
    await register('Alexandr', '123123');
}

test();
