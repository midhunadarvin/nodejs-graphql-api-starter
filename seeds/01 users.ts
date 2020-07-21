/**
 * Test data set (run `yarn db-seed --env=?`)
 * https://knexjs.org/#Seeds-API
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import Knex from 'knex';
import bcrypt from 'bcrypt';
// import faker from 'faker';

export async function seed(db: Knex): Promise<void> {
  const roles = [[1, 'admin'], [2, 'store_owner'], [3, 'customer']];
  await db.raw(
    `
      INSERT INTO user_roles (id, name)
      VALUES ${roles.map(() => '(?, ?)').join(', ')}
      ON CONFLICT DO NOTHING
    `,
    roles.reduce((acc, v) => [...acc, ...v], []),
  );

  // const users = Array.from({ length: 10 }).map(() => {
  //   const firstName = faker.name.firstName();
  //   const lastName = faker.name.lastName();
  //   return [
  //     faker.internet.userName(firstName, lastName),
  //     faker.internet.email(firstName, lastName, 'example.com'),
  //     faker.name.findName(firstName, lastName),
  //     faker.internet.avatar(),
  //   ];
  // });

  const users = [[
    'ce5dc418-c838-11ea-87d0-0242ac130003',
    'midhunadarvin',
    'midhunadarvin@gmail.com',
    bcrypt.hashSync('password1@3', 10),
    'Midhun A Darvin',
    'https://robohash.org/99850cf7a8887457815383286fd47858?set=set4&bgset=&size=400x400',
    '1'
  ], [
    'ce5dc418-c838-11ea-87d0-0242ac170007',
    'akshayvenugopal',
    'akshayvenugopal007@gmail.com',
    bcrypt.hashSync('password1@3', 10),
    'Akshay Venugopal',
    'https://robohash.org/99850cf7a8887457815383286fd47858?set=set4&bgset=&size=400x400',
    '1'
  ]];

  await db.raw(
    `
      INSERT INTO users (id, username, email, password, display_name, photo_url, role)
      VALUES ${users.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ')}
      ON CONFLICT DO NOTHING
    `,
    users.reduce((acc, v) => [...acc, ...v], []),
  );
}
