import Schema from './Schema';
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Repository from '../../data/Repository';
import {Logger} from '@overnightjs/logger';

export default class ApiSchema implements Schema {

  private readonly repository: Repository;

  constructor(repository: Repository) {
    if (!repository) {
      throw new Error('Repository cannot be null!');
    }
    this.repository = repository;
  }

  public provideSchema(): GraphQLSchema {

    const rates = [
      {
        code: 'AED',
        rate: 4.032625,
      },
      {
        code: 'DKK',
        rate: 86.086235,
      },
      {
        code: 'ALL',
        rate: 121.005361,
      },
    ];

    const authors = {
      Flavio: {
        name: 'Flavio',
        age: 36,
      },
      Roger: {
        name: 'Alesandro',
        age: 7,
      },
    };

    const rateType =  new GraphQLObjectType({
      name: 'Rate',
      fields: {
        code: {
          type: GraphQLString,
        },
        rate: {
          type: GraphQLFloat,
        },
      },
    });

    const queryType =  new GraphQLObjectType({
      name: 'Query',
      fields: {
        rate: {
          type: new GraphQLList(rateType),
          args: {
            id: { type:
                new GraphQLList(GraphQLString),
            },
          },
          resolve: (source, {id}) => {
            console.log('id', id);
            const postsList: object[] = [];
            // tslint:disable-next-line:forin
            for (const identifier in id) {
              // @ts-ignore
              postsList.push(rates[identifier]);
            }
            return postsList;
          },
        },
        rates: {
          type: new GraphQLList(rateType),
          resolve: () => {
            return rates;
          },
        },
      },
    });

    return new GraphQLSchema({
      query: queryType,
    });
  }

}
