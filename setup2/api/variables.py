sizes = [
    {'heading': 'Width'},
    {'minMax': [1, 20]},
    {'heading': 'Height'},
    {'minMax': [1, 50]}
]

styles = [
    '****Antique****',
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

    '****Antique Persian****',
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

    '****Persian Traditional****',
    'Kashan',
    'Mashad',
    'Isfahan',
    'Tehran',
    'Qum',
    'Nain',

    '****Antique Armenian / Caucasian****',
    'Karabagh',
    'Soumack',
    'Shirvan',
    'Caucasian',
    'Kazak',

    '****Antique Turkish****',
    'Ghiordes',
    'Sivas',
    'Hereke',
    'Kaysari',
    'Kilim',
    'Oushak',

    '****Antique Indian****',
    'Agra',
    'Amritsar',
    'Dhurrie',
    'Kashmir',
    'Lahour',
    'Larestan',

    '****Antique European****',
    'Tapestery',
    'French Deco',
    'French Aubusson',
    'French Savonerrie',
    'Spanish',
    'Donegal',
    'Arts and Crafts',
    'Bessarabian / Ukrainian',
    'Italian Textile',

    '****Contemporary Moroccan****',
    'High Atlas Collection',
    'African Tuareg Mat',

    '****Other Contemporary Rugs****',
    'Antique Inspired / Recreation',
    'Swedish / Scandinavian Recreation',
    'Modern',
    'Modern Flat Weave',
    'Afghan Modern Flat Weave',

    '****Vintage****',
    'Turkish',
    'Kilim / Flat Weave',
    'Over-Dyed Distressed',
    'Tulu',
    'Morrocan',

    '****Vintage Swedish / Scandinavian****',
    'Ingegerd',
    'Marta Mass Fjetterstrom',
    'Judith',
    'Swedish',
    'Scandinavian',

    '****Other****',
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
sort_by_order = ['name', 'price']
sort_by = [xx for x in sort_by_order for xx in (
    x.title() + ' ↑', x.title() + ' ↓')]

shop_filter_input_order = [
    {
        'inputType': 'radio', 'heading': 'Sort By', 'name': 'sortBy',
        'items': sort_by
    },
    {
        'inputType': 'range', 'heading': 'Size', 'subHeading': '(Feet)', 'name': 'size',
    },
    {
        'inputType': 'checkbox', 'heading': 'Style', 'name': 'style',
        'items': styles
    },
]
