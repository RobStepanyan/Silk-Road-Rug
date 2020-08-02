import { emailRegex } from './variables';

export function validateEmail(email) {
    return emailRegex.test(email)
}

export function toTitleCase(text) {
    let res = '';
    text.split(' ').forEach(element => {
        res += element.slice(0, 1).toUpperCase() + element.slice(1).toLowerCase();
    });

    return res;
}