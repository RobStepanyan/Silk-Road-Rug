import { toTitleCase } from './functions';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const cartCardInputsOrder = {
  'shipping': [
    'Will-Call Pick Up', 'Ground Shipping'],
  'additional': ['Insurance', 'Expedited Shipping',
    'Signature Release Required', 'White Glove Delivery']
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

export const dummyData = [
  {

    'heading': 'Rug Name', 'size': "10' x 13'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Another Fancy rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Still rug names', 'size': "11' x 13'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
  },
  {
    'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Rug Name', 'size': "11' x 13'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Another Fancy rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Still rug names', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
  },
  {
    'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Rug Name', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Another Fancy rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Still rug names', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
  },
  {
    'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Rug Name', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Another Fancy rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  },
  {
    'heading': 'Still rug names', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
  },
  {
    'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
    'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
    'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
  }
]