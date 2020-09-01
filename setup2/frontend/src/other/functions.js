import { emailRegex, pwdRegexes, pwdErrorMsgs, cartCardInputsOrder } from './variables';
import Cookies from 'universal-cookie';

export function validateEmail(email) {
    return emailRegex.test(email)
}

export function validatePwd(pwds, confirmPwd = false) {
    if (confirmPwd) {
        if (pwds[0] != pwds[1]) {
            return { isValid: false, errorMsgs: pwdErrorMsgs.diff }
        }
        return { isValid: true }
    }
    let errorMsgs = []
    Object.entries(pwdRegexes).forEach(x => {
        let [key, value] = x
        if (!value.test(pwds[0])) {
            errorMsgs = errorMsgs.concat(pwdErrorMsgs[key])
        }
    })
    if (errorMsgs.length) {
        return { isValid: false, errorMsgs: errorMsgs }
    }
    return { isValid: true }
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
    float = parseFloat(float)
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

export function formatSize(obj) {
    let { width_feet, width_inch, height_feet, height_inch } = obj;
    let all = [width_feet, width_inch, height_feet, height_inch]
    all = all.map((item, i) => {
        if (!item) { return }
        let end = i % 2 == 0 ? "'" : '"';
        return item.toString() + end
    })
    let width = all[0] + (all[1] ? all[1] : '');
    let height = all[2] + (all[3] ? all[3] : '');
    return `${width} x ${height}`
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

export function calculatePriceSum(data, addCosts) {
    let sum = 0;
    if (data) {
        data.forEach(data => {
            sum += data.pricesUSD['price']
        })
    }
    if (addCosts) {
        Object.values(addCosts).forEach(cost => {
            sum += cost
        })
    }
    return sum;
}

export function setJWTCookie(token) {
    let date = new Date()
    let settings = {
        path: '/',
        maxAge: 86400, //one day = 86400 seconds
        // secure: true,
        // httpOnly: true,
        // sameSite: true,
    }
    const cookies = new Cookies()

    cookies.set('accessJWT', token.access, { ...settings })
    cookies.set('refreshJWT', token.refresh, { ...settings })
}   