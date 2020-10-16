import { emailRegex, pwdRegexes, pwdErrorMsgs, cartCardInputsOrder, onlyTextRegex, apiURLs, apiHeaders } from './variables';
import Cookies from 'universal-cookie';
import axios from 'axios';

export function validateEmail(email) {
  return emailRegex.test(email)
}

export function validatePwd(pwds, confirmPwd = false) {
  if (confirmPwd) {
    if (pwds[0] !== pwds[1]) {
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

export function validatePhone(phone) {
  return axios({
    method: 'post',
    headers: apiHeaders.csrf,
    url: apiURLs.user.isPhoneValid,
    data: {
      number: phone
    }
  })
}

export function validateOnlyText(text) {
  return onlyTextRegex.test(text) ? true : false
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
  res = res.replaceAll(/\s+/g, '').replaceAll('-', '').replaceAll('_', '')
  return res.slice(0, 1).toLowerCase() + res.slice(1);
}

export function formatPrice(float, currency = '$') {
  float = parseFloat(float)
  let strPrice = '', cents = '';
  float = String(float.toFixed(2))
  if (float.includes('.') && float.slice(-2) !== '00') {
    cents = float.slice(-3)
  }
  float = float.slice(0, -3)
  float.split('').reverse().forEach((char, i) => {
    i % 3 === 0 && i > 0 ? strPrice += ',' + char : strPrice += char
  })
  return currency + strPrice.split('').reverse().join('') + cents
}

export function formatSize(obj) {
  let { width_feet, width_inch, height_feet, height_inch } = obj;
  let all = [width_feet, width_inch, height_feet, height_inch]
  all = all.map((item, i) => {
    if (!item) { return null }
    let end = i % 2 === 0 ? "'" : '"';
    return item.toString() + end
  })
  let width = all[0] + (all[1] ? all[1] : '');
  let height = all[2] + (all[3] ? all[3] : '');
  return `${width} x ${height}`
}

export function calculateAdditionalCosts(selectedNumbers, selectedRadios, selectedCheckboxes, data) {
  let addCosts = {};
  data.forEach((data, i) => {
    addCosts[i] = 0
    Object.keys(cartCardInputsOrder).forEach(key => {

      if (key === 'shipping') {
        addCosts[i] += data[Object.values(cartCardInputsOrder[key])[selectedRadios[i]['shipping']]]
      } else {
        Object.entries(cartCardInputsOrder[key]).forEach((value, ind) => {
          if (selectedCheckboxes[i][key].includes(ind)) {
            addCosts[i] += data[value[1]]
          }
        })
      }
    })
    addCosts[i] *= selectedNumbers[i]
  })
  return addCosts;
}

export function calculatePriceSum(data, selectedNumbers, addCosts) {
  let sum = 0;
  if (data) {
    data.forEach((data, i) => {
      sum += parseInt((data.price_usd_after_sale ? data.price_usd_after_sale : data.price_usd) * selectedNumbers[i])
    })
  }
  if (addCosts) {
    Object.values(addCosts).forEach(cost => {
      sum += parseInt(cost)
    })
  }
  return sum;
}

export function setJWTCookie(token) {
  let settings = {
    path: '/',
    // secure: true,
    // httpOnly: true,
    // sameSite: true,
  }
  const cookies = new Cookies()
  // maxAge is same as in settings.py
  cookies.set('accessJWT', token.access, { ...settings, maxAge: 20 * 60 })
  cookies.set('refreshJWT', token.refresh, { ...settings, maxAge: 60 * 60 * 24 })
}

export function removeJWTCookies() {
  const cookies = new Cookies()

  cookies.remove('accessJWT')
  cookies.remove('refreshJWT')
}

export function isAuthed() {
  const cookies = new Cookies()
  if (!cookies.get('refreshJWT')) {
    removeJWTCookies();
    return false
  }

  if (cookies.get('accessJWT')) {
    return true
  }
  // if access is not available
  axios({
    method: 'post',
    url: apiURLs.token.refresh,
    data: {
      refresh: cookies.get('refreshJWT')
    }
  })
    .then(response => {
      setJWTCookie(response.data)
    })
    .catch(() => false)
  return true
}

export function formValueKey(title) {
  title = title.toLowerCase().replaceAll(' ', '_')
  title = title.replaceAll('/', '_')
  let parenth = title.indexOf('(')
  if (parenth !== -1) {
    title = title.slice(0, parenth - 1)
  }
  return title
}