import { authController } from "./index";

let { whoami, logout, register, login, credentials } = authController;

whoami();
logout();
register('Dmitry', 'qwe');
register('Dmitry', 'qwerty');
whoami();
login('Dmitry', 'qwerty');
register('Dmitry', 'qwerty');
logout();
login('Dmitry', 'qwerty123');
register('Alexandr', '123123');
console.log(credentials);
