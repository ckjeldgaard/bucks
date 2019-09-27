import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {Ctrl} from './Ctrl';
import Api from '../api/Api';
import Rates from '../model/Rates';

@Controller('cron')
export class CronController implements Ctrl {

  private readonly API_BASE_URL: string = `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}&format=1`;
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  @Get()
  private async fetchLatestCurrencies(req: Request, res: Response): Promise<void> {
    try {
      const rates: Rates = await this.api.fetchExternalRates(this.API_BASE_URL);
      this.api.storeRates(rates);
      res.status(200).json({ok: true});
    } catch (e) {
      Logger.Err(e, true);
      res.status(500).json({ok: false});
    }

  }

}
