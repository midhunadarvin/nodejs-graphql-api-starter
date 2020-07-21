/**
 * Node.js GraphQL API Starter Kit
 * https://github.com/kriasoft/nodejs-api-starter
 * Copyright © 2016-present Kriasoft | MIT License
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';

import { UserType, StoreType } from './types';
import { UserDto } from '../interface/user.interface';
import UserDao from '../repository/user.dao';
import StoreDao from '../repository/store.dao';
import { StoreDto } from '../interface/store.interface';

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
        resolve: async (parent, args, ctx): Promise<UserDto | null> => {
          const user = await userDao.userById.load(args.id);
          return args.id ? user : null;
        },
      },
      store: {
        type: StoreType,
        args: { id: { type: GraphQLID } },
        resolve: async (parent, args, ctx): Promise<UserDto | null> => {
          const store = await storeDao.storeById.load(args.id);
          return args.id ? store : null;
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async (parent, args): Promise<UserDto[]> => {
          return await userDao.getUsers();
        }
      },
      stores: {
        type: new GraphQLList(StoreType),
        resolve: async (parent, args): Promise<StoreDto[]> => {
          return await storeDao.getStores();
        }
      },
    },
  }),
});
