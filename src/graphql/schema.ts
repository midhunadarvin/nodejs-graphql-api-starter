/**
 * Node.js GraphQL API Starter Kit
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLID } from 'graphql';

import { UserType, StoreType } from './types';
import { UserDto } from '../interface/user.interface';
import UserDao from '../repository/user.dao';
import StoreDao from '../repository/store.dao';

const userDao = new UserDao();
const storeDao = new StoreDao();

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    description: 'The top-level API',

    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: async (root, args, ctx): Promise<UserDto | null> => {
          const user = await userDao.userById.load(args.id);
          return args.id ? user : null;
        },
      },
      store: {
        type: StoreType,
        args: { id: { type: GraphQLID } },
        resolve: async (root, args, ctx): Promise<UserDto | null> => {
          console.log(args);
          const store = await storeDao.storeById.load(args.id);
          console.log(store);
          return args.id ? store : null;
        },
      }
    },
  }),
});
