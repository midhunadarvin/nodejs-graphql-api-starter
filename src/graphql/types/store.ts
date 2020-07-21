/**
 * Node.js GraphQL API Starter Kit
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import { UserType } from './user';
import { dateField } from '../fields';
import { Context } from '../context';
import UserDao from '../../repository/user.dao';
import { user } from '../queries';

const userDao = new UserDao();
export const StoreType = new GraphQLObjectType<any, Context>({
  name: 'Store',

  fields: {
    id: { type: GraphQLID },

    name: {
      type: new GraphQLNonNull(GraphQLString),
    },

    description: {
      type: GraphQLString,
    },

    address: {
      type: new GraphQLNonNull(GraphQLString),
    },

    latitude: {
      type: new GraphQLNonNull(GraphQLString),
    },

    longitude: {
      type: new GraphQLNonNull(GraphQLString),
    },

    owner: {
      type: new GraphQLNonNull(UserType),
      resolve: async (self, args, ctx): Promise<UserDao> => {
        return await userDao.userById.load(self.owner_id);
      },
    },

    createdAt: dateField((self: any) => self.created_at),
    updatedAt: dateField((self: any) => self.updated_at),
  },
});
