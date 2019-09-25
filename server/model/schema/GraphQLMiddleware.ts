import {Middleware} from 'express-graphql';

export default interface GraphQLMiddleware {
  endpoint(): string;
  buildGraphQL(): Middleware;
}
