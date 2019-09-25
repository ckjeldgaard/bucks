import Repository from '../data/Repository';
import {Ctrl} from './Ctrl';
import graphqlHTTP from 'express-graphql';
import ApiSchema from '../model/schema/ApiSchema';
import GraphQLMiddleware from '../model/schema/GraphQLMiddleware';

export class ApiController implements Ctrl, GraphQLMiddleware {

  private readonly endpointPath: string;
  private readonly repository: Repository;

  constructor(endpointPath: string, repository: Repository) {
    this.endpointPath = endpointPath;
    this.repository = repository;
  }

  public endpoint(): string {
    return this.endpointPath;
  }

  public buildGraphQL(): graphqlHTTP.Middleware {
    return graphqlHTTP({
      schema: new ApiSchema(this.repository).provideSchema(),
      graphiql: process.env.NODE_ENV !== 'production',
    });
  }

}
