/**
 * Node.js GraphQL API Starter Kit
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import { nodeInterface } from '../node';
import { dateField } from '../fields';
import { Context } from '../context';

export const UserType = new GraphQLObjectType<any, Context>({
  name: 'User',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    username: {
      type: new GraphQLNonNull(GraphQLString),
    },

    email: {
      type: GraphQLString,
      resolve(self, args, ctx): string | null {
        return ctx.user && (ctx.user.id === self.id || ctx.user.isAdmin)
          ? self.email
          : null;
      },
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
      resolve(self, args, ctx): boolean {
        return ctx.user && ctx.user.id === self.id
          ? ctx.user.isAdmin || false
          : self.is_admin;
      },
    },

    createdAt: dateField((self: any) => self.created_at),
    updatedAt: dateField((self: any) => self.updated_at),
    lastLoginAt: dateField((self: any) => self.last_login_at),
  },
});
