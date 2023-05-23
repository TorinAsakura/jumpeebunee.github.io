import { VALID_CHARACTERS } from "../data/data";

export const encryptPassword = (password: string): string => {
    let encryptedPassword = '';

    for (let i = 0; i < password.length; i += 1) {
        encryptedPassword += `${VALID_CHARACTERS[i % password.length]}6${password[i]}`;
    }

    return encryptedPassword.split('').reverse().join('');
}
