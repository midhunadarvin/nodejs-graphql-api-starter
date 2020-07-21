/**
 * Node.js GraphQL API Starter Kit
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import { dateField } from '../fields';
import { Context } from '../context';

export const UserType = new GraphQLObjectType<any, Context>({
  name: 'User',
  fields: {
    id: { type: GraphQLID },

    username: {
      type: new GraphQLNonNull(GraphQLString),
    },

    email: {
      type: GraphQLString,
    },

    displayName: {
      type: GraphQLString,
      resolve(self): string {
        return self.display_name;
      },
    },

    photoURL: {
      type: GraphQLString,
      resolve(self): string {
        return self.photo_url;
      },
    },

    isAdmin: {
      type: GraphQLBoolean,
      resolve(self): boolean {
        return self.role === 1;
      },
    },

    createdAt: dateField((self: any) => self.created_at),
    updatedAt: dateField((self: any) => self.updated_at),
    lastLoginAt: dateField((self: any) => self.last_login_at),
  },
});
