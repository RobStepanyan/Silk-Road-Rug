import { emailRegex } from './variables';

export function validateEmail(email) {
    return emailRegex.test(email)
}