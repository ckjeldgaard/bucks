import {GraphQLSchema} from 'graphql';

export default interface Schema {
  provideSchema(): GraphQLSchema;
}
