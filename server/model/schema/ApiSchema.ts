import Schema from './Schema';
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Repository from '../../data/Repository';

export default class ApiSchema implements Schema {

  private readonly repository: Repository;

  constructor(repository: Repository) {
    if (!repository) {
      throw new Error('Repository cannot be null!');
    }
    this.repository = repository;
  }

  public provideSchema(): GraphQLSchema {

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
          resolve: async (source, {id}) => {

            const apiRates = await this.repository.getRates();

            const postsList: object[] = [];
            for (const codeKey in apiRates) {
              if (apiRates.hasOwnProperty(codeKey) && id.includes(codeKey)) {

                postsList.push({
                  code: codeKey,
                  rate: apiRates[codeKey],
                });
              }
            }
            return postsList;
          },
        },
        rates: {
          type: new GraphQLList(rateType),
          resolve: async () => {
            const apiRates = await this.repository.getRates();

            const postsList: object[] = [];
            for (const codeKey in apiRates) {
              if (apiRates.hasOwnProperty(codeKey)) {
                postsList.push({
                  code: codeKey,
                  rate: apiRates[codeKey],
                });
              }
            }
            return postsList;
          },
        },
      },
    });

    return new GraphQLSchema({
      query: queryType,
    });
  }

}
