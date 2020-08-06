import { emailRegex, cartCardInputsOrder } from './variables';

export function validateEmail(email) {
    return emailRegex.test(email)
}

export function toTitleCase(text) {
    let res = '';
    text.split(' ').forEach(element => {
        res += element.slice(0, 1).toUpperCase() + element.slice(1).toLowerCase() + ' ';
    });

    return res.trim();
}

export function toCamelCase(text) {
    let res = toTitleCase(text);
    res = res.replace(/\s+/g, '').replace('-', '').replace('_', '')
    return res.slice(0, 1).toLowerCase() + res.slice(1);
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

export function calculateAdditionalCosts(selectedRadios, selectedCheckboxes, data) {
    let addCosts = {};
    data.forEach((data, i) => {
        addCosts[i] = 0
        Object.keys(cartCardInputsOrder).forEach(key => {
            if (key == 'shipping') {
                addCosts[i] += data.pricesUSD[toCamelCase(cartCardInputsOrder[key][selectedRadios[i]['shipping']])]
            } else {
                cartCardInputsOrder[key].forEach((value, valueIndex) => {
                    if (selectedCheckboxes[i][key].includes(valueIndex)) {
                        addCosts[i] += data.pricesUSD[toCamelCase(value)]
                    }
                })
            }
        })
    })
    return addCosts;
}
