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
  'Persian',
  'Armenian / Caucasian',
  'Khotan / Samerkand',
  'Turkish',
  'Turqish Kilim',
  'Indian',
  'European',
  'Chinese',
  'Inspired / Recreation',

  { 'heading': 'Vintage' },
  'Moroccan',
  'Turkish',

  { 'heading': 'Contemporary' },
  'Moroccan High Atlas',
  'Modern',

  { 'heading': 'Other' },
  'Afghan / Balouch',
  'Gallery-Size Rugs',
  'Furniture / Accessories'
]

export const colors = [
  'Black / Charcoal',
  'Blue',
  'Green',
  'Grey',
  'Neutral / Beige / Taupe',
  'Orange',
  'Purple / Lilac',
  'Red / Pink',
  'White / Cream',
  'Yellow'
]

export const shopFilterInputOrder = [
  {
    'inputType': 'radio', 'heading': 'Sort By', 'name': 'sortBy',
    'items': ['Name', 'Price']
  },
  {
    'inputType': 'range', 'heading': 'Size', 'subHeading': '(Feet)', 'name': 'size',
    'items': sizes
  },
  {
    'inputType': 'checkbox', 'heading': 'Style', 'name': 'style',
    'items': styles
  },
  {
    'inputType': 'checkbox', 'heading': 'Color', 'name': 'color',
    'items': colors
  }
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