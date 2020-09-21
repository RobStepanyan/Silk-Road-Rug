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

COUNTRIES = (
    ('AF', 'Afghanistan',),
    ('AX', 'Aland Islands',),
    ('AL', 'Albania',),
    ('DZ', 'Algeria',),
    ('AS', 'American Samoa',),
    ('AD', 'Andorra',),
    ('AO', 'Angola',),
    ('AI', 'Anguilla',),
    ('AQ', 'Antarctica',),
    ('AG', 'Antigua and Barbuda',),
    ('AR', 'Argentina',),
    ('AM', 'Armenia',),
    ('AW', 'Aruba',),
    ('AU', 'Australia',),
    ('AT', 'Austria',),
    ('AZ', 'Azerbaijan',),
    ('BS', 'Bahamas',),
    ('BH', 'Bahrain',),
    ('BD', 'Bangladesh',),
    ('BB', 'Barbados',),
    ('BY', 'Belarus',),
    ('BE', 'Belgium',),
    ('BZ', 'Belize',),
    ('BJ', 'Benin',),
    ('BM', 'Bermuda',),
    ('BT', 'Bhutan',),
    ('BO', 'Bolivia, Plurinational State of',),
    ('BQ', 'Bonaire, Sint Eustatius and Saba',),
    ('BA', 'Bosnia and Herzegovina',),
    ('BW', 'Botswana',),
    ('BV', 'Bouvet Island',),
    ('BR', 'Brazil',),
    ('IO', 'British Indian Ocean Territory',),
    ('BN', 'Brunei Darussalam',),
    ('BG', 'Bulgaria',),
    ('BF', 'Burkina Faso',),
    ('BI', 'Burundi',),
    ('KH', 'Cambodia',),
    ('CM', 'Cameroon',),
    ('CA', 'Canada',),
    ('CV', 'Cape Verde',),
    ('KY', 'Cayman Islands',),
    ('CF', 'Central African Republic',),
    ('TD', 'Chad',),
    ('CL', 'Chile',),
    ('CN', 'China',),
    ('CX', 'Christmas Island',),
    ('CC', 'Cocos (Keeling) Islands',),
    ('CO', 'Colombia',),
    ('KM', 'Comoros',),
    ('CG', 'Congo',),
    ('CD', 'Congo, the Democratic Republic of the',),
    ('CK', 'Cook Islands',),
    ('CR', 'Costa Rica',),
    ('CI', "Cote d'Ivoire",),
    ('HR', 'Croatia',),
    ('CU', 'Cuba',),
    ('CW', 'Curacao',),
    ('CY', 'Cyprus',),
    ('CZ', 'Czech Republic',),
    ('DK', 'Denmark',),
    ('DJ', 'Djibouti',),
    ('DM', 'Dominica',),
    ('DO', 'Dominican Republic',),
    ('EC', 'Ecuador',),
    ('EG', 'Egypt',),
    ('SV', 'El Salvador',),
    ('GQ', 'Equatorial Guinea',),
    ('ER', 'Eritrea',),
    ('EE', 'Estonia',),
    ('ET', 'Ethiopia',),
    ('FK', 'Falkland Islands (Malvinas)',),
    ('FO', 'Faroe Islands',),
    ('FJ', 'Fiji',),
    ('FI', 'Finland',),
    ('FR', 'France',),
    ('GF', 'French Guiana',),
    ('PF', 'French Polynesia',),
    ('TF', 'French Southern Territories',),
    ('GA', 'Gabon',),
    ('GM', 'Gambia',),
    ('GE', 'Georgia',),
    ('DE', 'Germany',),
    ('GH', 'Ghana',),
    ('GI', 'Gibraltar',),
    ('GR', 'Greece',),
    ('GL', 'Greenland',),
    ('GD', 'Grenada',),
    ('GP', 'Guadeloupe',),
    ('GU', 'Guam',),
    ('GT', 'Guatemala',),
    ('GG', 'Guernsey',),
    ('GN', 'Guinea',),
    ('GW', 'Guinea-Bissau',),
    ('GY', 'Guyana',),
    ('HT', 'Haiti',),
    ('HM', 'Heard Island and McDonald Islands',),
    ('VA', 'Holy See (Vatican City State)',),
    ('HN', 'Honduras',),
    ('HK', 'Hong Kong',),
    ('HU', 'Hungary',),
    ('IS', 'Iceland',),
    ('IN', 'India',),
    ('ID', 'Indonesia',),
    ('IR', 'Iran, Islamic Republic of',),
    ('IQ', 'Iraq',),
    ('IE', 'Ireland',),
    ('IM', 'Isle of Man',),
    ('IL', 'Israel',),
    ('IT', 'Italy',),
    ('JM', 'Jamaica',),
    ('JP', 'Japan',),
    ('JE', 'Jersey',),
    ('JO', 'Jordan',),
    ('KZ', 'Kazakhstan',),
    ('KE', 'Kenya',),
    ('KI', 'Kiribati',),
    ('KP', "Korea, Democratic People's Republic of",),
    ('KR', 'Korea, Republic of',),
    ('KW', 'Kuwait',),
    ('KG', 'Kyrgyzstan',),
    ('LA', "Lao People's Democratic Republic",),
    ('LV', 'Latvia',),
    ('LB', 'Lebanon',),
    ('LS', 'Lesotho',),
    ('LR', 'Liberia',),
    ('LY', 'Libya',),
    ('LI', 'Liechtenstein',),
    ('LT', 'Lithuania',),
    ('LU', 'Luxembourg',),
    ('MO', 'Macao',),
    ('MK', 'Macedonia, the former Yugoslav Republic of',),
    ('MG', 'Madagascar',),
    ('MW', 'Malawi',),
    ('MY', 'Malaysia',),
    ('MV', 'Maldives',),
    ('ML', 'Mali',),
    ('MT', 'Malta',),
    ('MH', 'Marshall Islands',),
    ('MQ', 'Martinique',),
    ('MR', 'Mauritania',),
    ('MU', 'Mauritius',),
    ('YT', 'Mayotte',),
    ('MX', 'Mexico',),
    ('FM', 'Micronesia, Federated States of',),
    ('MD', 'Moldova, Republic of',),
    ('MC', 'Monaco',),
    ('MN', 'Mongolia',),
    ('ME', 'Montenegro',),
    ('MS', 'Montserrat',),
    ('MA', 'Morocco',),
    ('MZ', 'Mozambique',),
    ('MM', 'Myanmar',),
    ('NA', 'Namibia',),
    ('NR', 'Nauru',),
    ('NP', 'Nepal',),
    ('NL', 'Netherlands',),
    ('NC', 'New Caledonia',),
    ('NZ', 'New Zealand',),
    ('NI', 'Nicaragua',),
    ('NE', 'Niger',),
    ('NG', 'Nigeria',),
    ('NU', 'Niue',),
    ('NF', 'Norfolk Island',),
    ('MP', 'Northern Mariana Islands',),
    ('NO', 'Norway',),
    ('OM', 'Oman',),
    ('PK', 'Pakistan',),
    ('PW', 'Palau',),
    ('PS', 'Palestine, State of',),
    ('PA', 'Panama',),
    ('PG', 'Papua New Guinea',),
    ('PY', 'Paraguay',),
    ('PE', 'Peru',),
    ('PH', 'Philippines',),
    ('PN', 'Pitcairn',),
    ('PL', 'Poland',),
    ('PT', 'Portugal',),
    ('PR', 'Puerto Rico',),
    ('QA', 'Qatar',),
    ('RE', 'Reunion',),
    ('RO', 'Romania',),
    ('RU', 'Russian Federation',),
    ('RW', 'Rwanda',),
    ('BL', 'Saint Barthelemy',),
    ('SH', 'Saint Helena, Ascension and Tristan da Cunha',),
    ('KN', 'Saint Kitts and Nevis',),
    ('LC', 'Saint Lucia',),
    ('MF', 'Saint Martin (French part)',),
    ('PM', 'Saint Pierre and Miquelon',),
    ('VC', 'Saint Vincent and the Grenadines',),
    ('WS', 'Samoa',),
    ('SM', 'San Marino',),
    ('ST', 'Sao Tome and Principe',),
    ('SA', 'Saudi Arabia',),
    ('SN', 'Senegal',),
    ('RS', 'Serbia',),
    ('SC', 'Seychelles',),
    ('SL', 'Sierra Leone',),
    ('SG', 'Singapore',),
    ('SX', 'Sint Maarten (Dutch part)',),
    ('SK', 'Slovakia',),
    ('SI', 'Slovenia',),
    ('SB', 'Solomon Islands',),
    ('SO', 'Somalia',),
    ('ZA', 'South Africa',),
    ('GS', 'South Georgia and the South Sandwich Islands',),
    ('SS', 'South Sudan',),
    ('ES', 'Spain',),
    ('LK', 'Sri Lanka',),
    ('SD', 'Sudan',),
    ('SR', 'Suriname',),
    ('SJ', 'Svalbard and Jan Mayen',),
    ('SZ', 'Swaziland',),
    ('SE', 'Sweden',),
    ('CH', 'Switzerland',),
    ('SY', 'Syrian Arab Republic',),
    ('TW', 'Taiwan, Province of China',),
    ('TJ', 'Tajikistan',),
    ('TZ', 'Tanzania, United Republic of',),
    ('TH', 'Thailand',),
    ('TL', 'Timor-Leste',),
    ('TG', 'Togo',),
    ('TK', 'Tokelau',),
    ('TO', 'Tonga',),
    ('TT', 'Trinidad and Tobago',),
    ('TN', 'Tunisia',),
    ('TR', 'Turkey',),
    ('TM', 'Turkmenistan',),
    ('TC', 'Turks and Caicos Islands',),
    ('TV', 'Tuvalu',),
    ('UG', 'Uganda',),
    ('UA', 'Ukraine',),
    ('AE', 'United Arab Emirates',),
    ('GB', 'United Kingdom',),
    ('US', 'United States',),
    ('UM', 'United States Minor Outlying Islands',),
    ('UY', 'Uruguay',),
    ('UZ', 'Uzbekistan',),
    ('VU', 'Vanuatu',),
    ('VE', 'Venezuela, Bolivarian Republic of',),
    ('VN', 'Vietnam',),
    ('VG', 'Virgin Islands, British',),
    ('VI', 'Virgin Islands, U.S.',),
    ('WF', 'Wallis and Futuna',),
    ('EH', 'Western Sahara',),
    ('YE', 'Yemen',),
    ('ZM', 'Zambia',),
    ('ZW', 'Zimbabwe',),
)
# Avoid dupliacte keys in shippig methods and additional services (key example: 'XY')
SHIPPING_METHODS = (
    ('WC', 'Will-Call Pick Up'),
    ('GS', 'Ground Shipping'),
)

DEFAULT_SHIPPING_METHODS = (
    ('WC', 0),
    ('GS', 200),
)
# Avoid dupliacte keys in shippig methods and additional services (key example: 'XY')
ADDITIONAL_SERVICES = (
    ('IN', 'Insurance'),
    ('ES', 'Expedited Shipping'),
    ('SR', 'Signature Release Required'),
    ('WG', 'White Glove Delivery'),
)

DEFAULT_ADDITIONAL_SERVICES = (
    ('IN', 200),
    ('ES', 200),
    ('SR', 200),
    ('WG', 200),
)
