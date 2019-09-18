import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import Repository from '../data/Repository';


@Controller('api')
export class ApiController {

  private readonly repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  @Get('currencies')
  private async apiCurrencies(req: Request, res: Response): Promise<void> {
    const rates = await this.repository.getRates();
    Logger.Info(rates, true);
    res.status(200).json(rates);
  }

}
