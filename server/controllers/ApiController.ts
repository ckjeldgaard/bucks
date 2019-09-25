import {Request, Response} from 'express';
import {Controller, Get, Post, ClassMiddleware, Middleware} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import Repository from '../data/Repository';
import {Ctrl} from './Ctrl';
import graphqlHTTP = require('express-graphql');
import ApiSchema from '../model/schema/ApiSchema';

@Controller('api')
@ClassMiddleware(graphqlHTTP({
  schema: new ApiSchema(this.repository).provideSchema(),
  graphiql: true,
}))
export class ApiController implements Ctrl {

  private readonly repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;

    Reflect.defineMetadata('repo', repository, this);
  }

  @Get('currencies')
  private apiCurrencies(req: Request, res: Response): void {
    Logger.Info('apiCurrenciesGET', true);
    const rates = {rates: 'currencies'};
  }

  @Post('currencies')
  private postCurrencies(req: Request, res: Response): void {
    Logger.Info('apiCurrenciesPOST', true);
    const rates = {rates: 'currencies'};
  }

}
