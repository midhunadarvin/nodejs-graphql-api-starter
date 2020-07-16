/**
 * Initial database schema (run `yarn db-migrate --env=?`)
 * https://knexjs.org/#Schema
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import * as Knex from 'knex';

// prettier-ignore
export async function up(db: Knex): Promise<void> {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('users', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('username', 50).notNullable().unique();
    table.string('email', 100);
    table.string('display_name', 100);
    table.string('photo_url', 250);
    table.timestamp('last_login_at').notNullable().defaultTo(db.fn.now());
    table.timestamps(false, true);
  });

  await db.schema.createTable('stores', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.uuid('owner_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('name', 120).notNullable();
    table.string('description', 120).notNullable();
    table.float('latitude', 10, 8);
    table.float('longitude', 11, 8);
    table.timestamps(false, true);
  });
}

export async function down(db: Knex): Promise<void> {
  await db.schema.dropTableIfExists('stores');
  await db.schema.dropTableIfExists('users');
}

export const configuration = { transaction: true };
