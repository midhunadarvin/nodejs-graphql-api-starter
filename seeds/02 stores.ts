/**
 * Test data set (run `yarn db-seed --env=?`)
 * https://knexjs.org/#Seeds-API
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import Knex from 'knex';

function randomGeo(center, radius) {
  let y0 = center.latitude;
  let x0 = center.longitude;
  let rd = radius / 111300; //about 111300 meters in one degree

  let u = Math.random();
  let v = Math.random();

  let w = rd * Math.sqrt(u);
  let t = 2 * Math.PI * v;
  let x = w * Math.cos(t);
  let y = w * Math.sin(t);

  //Adjust the x-coordinate for the shrinking of the east-west distances
  let xp = x / Math.cos(y0);

  let newlat = y + y0;
  let newlon = x + x0;
  let newlon2 = x + x0;

  return {
    'latitude': newlat.toFixed(5),
    'longitude': newlon.toFixed(5),
    // 'longitude2': newlon2.toFixed(5),
    // 'distance': distance(center.latitude, center.longitude, newlat, newlon).toFixed(2),
    // 'distance2': distance(center.latitude, center.longitude, newlat, newlon2).toFixed(2),
  };
}

//Generate a number of mappoints
function generateMapPoints(centerpoint, distance, amount) {
  let mappoints = [];
  for (let i = 0; i < amount; i++) {
    mappoints.push(randomGeo(centerpoint, distance));
  }
  return mappoints;
}

export async function seed(db: Knex): Promise<void> {
  const distanceLimit = 5000; //in meters
  // const center = { latitude: 8.5685451, longitude: 76.8731403 };
  // const center = { latitude: 11.2769492, longitude: 75.7850003 }; // kozhikode
  // const center = { latitude: 10.5276446, longitude: 76.2143898 }; // thrissur
  const center = { latitude: 9.9683621, longitude: 76.318202 }; // vytilla
  const randomStores = generateMapPoints(center, distanceLimit, 10000).map((item, index: number) => [
    'ce5dc418-c838-11ea-87d0-0242ac130003',
    'Store ' + index,
    'Store ' + index + ' Description',
    'Store Address ' + index,
    item.latitude,
    item.longitude,
  ]);

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
    ],
    ...randomStores
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
