
import {toTitleCase } from './functions';

export const onlyTextRegex = /^[a-zA-Z ]*$/
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const pwdRegexes = {
  all: /^(?=.*[0-9])(?=.*[A-Za-z]).{7,63}$/,
  length: /^.{7,63}$/,
  char: /(?=.*[A-Za-z]).*/,
  num: /(?=.*[0-9]).*/
}

export const pwdErrorMsgs = {
  all: 'Password should contain ',
  length: '8 or more characters.',
  char: 'At least one letter',
  num: 'At least one digit',
  diff: 'Passwords didn\'t match',
}

// Same as in models.py
export const cartCardInputsOrder = {
  shipping: {
    'Will-Call Pick Up': 'WC', 'Ground Shipping': 'GS',
    'Expedited Shipping': 'ES',
  },
  additional: {
    'Insurance': 'IN',
    'Signature Release Required': 'SR', 'White Glove Delivery': 'WG'
  }
}

export const sizes = [
  { 'heading': 'Width' },
  { 'minMax': [1, 20] },
  { 'heading': 'Height' },
  { 'minMax': [1, 50] }
]

export const styles = [
  { 'heading': 'Antique' },
  'Khotan',
  'Samarkand',
  'Chinese',
  'Afghan',
  'Balouch',
  'Afshar',
  'Turkaman',
  'Ersari',
  'Bukara',
  'Tekke',

  { 'heading': 'Antique Persian' },
  'Malayer',
  'Tabriz',
  'Sultanabad',
  'Mahal',
  'Mahal',
  'Farahan',
  'Kerman',
  'Khorassan',
  'Heriz',
  'Serapi',
  'Sarab / Camel',
  'Bakhshaish',
  'Bakhtiari',
  'Bidjar',

  { 'heading': 'Persian Traditional' },
  'Kashan',
  'Mashad',
  'Isfahan',
  'Tehran',
  'Qum',
  'Nain',

  { 'heading': 'Antique Armenian / Caucasian' },
  'Karabagh',
  'Soumack',
  'Shirvan',
  'Caucasian',
  'Kazak',

  { 'heading': 'Antique Turkish' },
  'Ghiordes',
  'Sivas',
  'Hereke',
  'Kaysari',
  'Kilim',
  'Oushak',

  { 'heading': 'Antique Indian' },
  'Agra',
  'Amritsar',
  'Dhurrie',
  'Kashmir',
  'Lahour',
  'Larestan',

  { 'heading': 'Antique European' },
  'Tapestery',
  'French Deco',
  'French Aubusson',
  'French Savonerrie',
  'Spanish',
  'Donegal',
  'Arts and Crafts',
  'Bessarabian / Ukrainian',
  'Italian Textile',

  { 'heading': 'Contemporary Moroccan' },
  'High Atlas Collection',
  'African Tuareg Mat',

  { 'heading': 'Other Contemporary Rugs' },
  'Antique Inspired / Recreation',
  'Swedish / Scandinavian Recreation',
  'Modern',
  'Modern Flat Weave',
  'Afghan Modern Flat Weave',

  { 'heading': 'Vintage' },
  'Turkish',
  'Kilim / Flat Weave',
  'Over-Dyed Distressed',
  'Tulu',
  'Morrocan',

  { 'heading': 'Vintage Swedish / Scandinavian' },
  'Ingegerd',
  'Marta Mass Fjetterstrom',
  'Judith',
  'Swedish',
  'Scandinavian',

  { 'heading': 'Other' },
  'Saddle Bags',
  'Gallery-Size',
  'Furniture / Accessories',
  'Sustainable',
  'Decorative',
  'Ethnic',
  'Traditional',
  'Natural & Broad Loom',
  'Custom Order'
]

// export const colors = [
//   'Black / Charcoal',
//   'Blue',
//   'Green',
//   'Grey',
//   'Neutral / Beige / Taupe',
//   'Orange',
//   'Purple / Lilac',
//   'Red / Pink',
//   'White / Cream',
//   'Yellow'
// ]

export const sortByOrder = ['name', 'price']
export const sortBy = sortByOrder.flatMap(x => [toTitleCase(x) + ' ↑', toTitleCase(x) + ' ↓'])

export const shopFilterInputOrder = [
  {
    'inputType': 'radio', 'heading': 'Sort By', 'name': 'sortBy',
    'items': sortBy
  },
  {
    'inputType': 'range', 'heading': 'Size', 'subHeading': '(Feet)', 'name': 'size',
    'items': sizes
  },
  {
    'inputType': 'checkbox', 'heading': 'Style', 'name': 'style',
    'items': styles
  },
  // {
  //   'inputType': 'checkbox', 'heading': 'Color', 'name': 'color',
  //   'items': colors
  // }
]

const apiBase = '//52.56.46.154:8000/api/'
export const apiURLs = {
  listRugs: apiBase + 'rugs/',
  rugById: id => apiBase + `rugs/${id}/`,
  signUp: apiBase + 'auth/signup/',
  signUpVerify: (uidb64, token) => apiBase + `auth/signup-verify/?uidb64=${uidb64}&token=${token}`,
  logIn: apiBase + 'auth/login/',
  forgotPwd: {
    inputEmail: apiBase + 'auth/forgot/input-email/',
    verifyToken: (uidb64, token) => apiBase + `auth/forgot/verify-token/?uidb64=${uidb64}&token=${token}`,
    inputNewPwd: apiBase + 'auth/forgot/input-new-pwd/',
  },
  token: {
    refresh: apiBase + 'token/refresh/',
    verify: apiBase + 'token/verify/',
  },
  user: {
    details: apiBase + 'user/details/',
    updatePersonalInfo: apiBase + 'user/update/personal-info/',
    updateVerify: midb64 => apiBase + 'user/update/verify/?midb64=' + midb64,
    changePwd: apiBase + 'user/change-pwd/',
    changePwdVerify: midb64 => apiBase + 'user/change-pwd/verify/?midb64=' + midb64,
    addresses: apiBase + 'user/addresses/',
    addAddress: apiBase + 'user/addresses/add/',
    removeAddress: apiBase + 'user/addresses/delete/',
    editAddress: apiBase + 'user/addresses/edit/',
    getAddress: apiBase + 'user/address/',
    setPrimaryAddress: apiBase + 'user/addresses/set-primary/',
    isPhoneValid: apiBase + 'validate/phone-number/',
    cart: {
      list: apiBase + 'user/cart/',
      get: id => apiBase + `user/cart/${id}/`,
      delete: id => apiBase + `user/cart/${id}/`,
      create: apiBase + 'user/cart/',
      update: id => apiBase + `user/cart/${id}/`,
      partialUpdate: id => apiBase + `user/cart/${id}/`,
    },
    order: {
      list: apiBase + 'user/order/'
    },
  },
  checkout: {
    createSession: apiBase + 'checkout/create-session/',
    check: apiBase + 'checkout/check/',
    cancel: apiBase + 'checkout/cancel/',
  },
  contactUs: {
    create: apiBase + 'contact-us/'
  },
  getCSRF: apiBase + 'get-csrf/',
}

// To avoid circular import errors
export {apiHeaders} from './functions'

export const dummyData = [
  {

    'name': 'Rug Name', 'size': "10' x 13'", 'style': 'Contemporary',
    'sku': '123', 'image': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'name': 'Another Fancy rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'sku': '123', 'image': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'name': 'Still rug names', 'size': "11' x 13'", 'style': 'Contemporary',
    'sku': '123', 'image': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
  },
  {
    'name': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'sku': '123', 'image': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'name': 'Rug Name', 'size': "11' x 13'", 'style': 'Contemporary',
    'sku': '123', 'image': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
]

export const slickCarouselSettings = [
  {
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    cssEase: 'ease',
  },

  {
    // autoplay: true,
    // autoplaySpeed: 2000,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    centerMode: true,
    cssEase: 'ease',

    responsive: [
      {
        breakpoint: 787,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  }
]

export const COUNTRIES = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia, Plurinational State of',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, the Democratic Republic of the',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: "Cote d'Ivoire",
  HR: 'Croatia',
  CU: 'Cuba',
  CW: 'Curacao',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island and McDonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: "Korea, Democratic People's Republic of",
  KR: 'Korea, Republic of',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia, the former Yugoslav Republic of',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States of',
  MD: 'Moldova, Republic of',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine, State of',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin (French part)',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome and Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten (Dutch part)',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan, Province of China',
  TJ: 'Tajikistan',
  TZ: 'Tanzania, United Republic of',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Minor Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela, Bolivarian Republic of',
  VN: 'Vietnam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
}

export const apiTimeZone = 'America/Los_Angeles'

export const supportedFiles = '.mov,.mpeg,.mp4,.avi,.svg, .png,.jpeg,.jpg,.pdf'
