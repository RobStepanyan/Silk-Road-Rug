export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const cartCardInputsOrder = {
  'shipping': [
    'Will-Call Pick Up', 'Ground Shipping'],
  'additional': ['Insurance', 'Expedited Shipping',
    'Signature Release Required', 'White Glove Delivery']
}

export const shopFilterInputOrder = [
  {
    'inputType': 'radio', 'heading': 'Sort By', 'name': 'sortBy',
    'items': ['Name', 'Price']
  },
  {
    'inputType': 'checkbox', 'heading': 'Size', 'name': 'size',
    'items': [
      "1' x 2' to 5' x 7'",
      "6' x 9'",
      "8' x 10'",
      "9' x 12'",
      "10' x 14'",
      "12' x 15' to 12' x 18'",
      "14' x 20' to 14' x 40'",
    ]
  },
  {
    'inputType': 'checkbox', 'heading': 'Style', 'name': 'style',
    'items': [
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
    ]
  },
  {
    'inputType': 'checkbox', 'heading': 'Color', 'name': 'color',
    'items': [
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
  }
]