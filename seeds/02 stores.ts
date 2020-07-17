/**
 * Test data set (run `yarn db-seed --env=?`)
 * https://knexjs.org/#Seeds-API
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import Knex from 'knex';

export async function seed(db: Knex): Promise<void> {
  const stores = [
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'Margin Free Supermarket',
      'മാർജിൻ ഫ്രീ സൂപ്പർ മാർക്കറ്റ്',
      '30/1011, Kochi, Vyttila Junction, Vyttila, Ernakulam, Kerala 682019',
      '9.9681321',
      '76.3188136'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'Gourmet Grace',
      'ഗൌർമെറ്റ് ഗ്രേസ്',
      'Service Rd, Thykoodam, Vyttila, Ernakulam, Kerala 682019',
      '9.9577262',
      '76.3188431'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'supplyco supermarket',
      '',
      'Vylopilly Rd, Below Gold\'s Gym, Ponnurunni, Vyttila, Ernakulam, Kerala 682019',
      '9.9714395',
      '76.3172418'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'More',
      'മോർ സൂപ്പർ മാർക്കറ്റ്',
      'Jawahar Nagar, Ponnurunni, Kadavanthra, Ernakulam, Kerala 682020',
      '9.9732966',
      '76.3081679'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'Reliance Fresh',
      'റിലയൻസ് ഫ്രെഷ്',
      '28/706 A, KP Vallon Rd, Giri Nagar, Kadavanthra, Kochi, Kerala 682020',
      '9.9631101',
      '76.3005611'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'TakeAway SuperMart',
      'റിലയൻസ് ഫ്രെഷ്',
      'Near, Metro Pillar: 931, Buldg No: 49/1931B, VD Mansion, Chambakkara Bridge, Thykoodam, Vyttila, Ernakulam, Kerala 682019',
      '9.9579084',
      '76.3261333'
    ],
    [
      'ce5dc418-c838-11ea-87d0-0242ac130003',
      'Big Mart Super Market',
      'ബിഗ് മാർട്ട് സൂപ്പർ മാർക്കറ്റ്',
      'Kaniampuzha Road, Opposite Vyttila HOD, Vyttila, Ernakulam, Kerala 682019',
      '9.9698492',
      '76.3202298'
    ]

  ];

  await db.raw(
    `
      INSERT INTO public.stores(
        owner_id, name, description, address, latitude, longitude)
        VALUES ${stores.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')}
        ON CONFLICT DO NOTHING
    `,
    stores.reduce((acc, v) => [...acc, ...v], []));
}
