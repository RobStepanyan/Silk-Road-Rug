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

export function formatPrice(float, currency = '$') {
    let strPrice = '', cents = '';
    float = String(float.toFixed(2))
    if (float.includes('.') && float.slice(-2) != '00') {
        cents = float.slice(-3)
    }
    float = float.slice(0, -3)
    float.split('').reverse().forEach((char, i) => {
        i % 3 == 0 && i > 0 ? strPrice += ',' + char : strPrice += char
    })
    return currency + strPrice.split('').reverse().join('') + cents
}