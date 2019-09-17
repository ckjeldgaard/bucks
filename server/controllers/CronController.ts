import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import axios from 'axios';

@Controller('cron')
export class CronController {

  private readonly API_BASE_URL: string = 'http://data.fixer.io';

  @Get()
  private async fetchLatestCurrencies(req: Request, res: Response): Promise<void> {

    try {
      const data =
        await axios.get(
          `${this.API_BASE_URL}/api/latest?access_key=${process.env.API_KEY}&format=1`,
          {timeout: 1500},
        );
      Logger.Info(data, true);
      res.status(200).send(data.data);
    } catch (e) {
      Logger.Err(e, true);
      res.status(500).send('An error occurred.');
    }

  }

}
