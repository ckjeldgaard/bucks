import {Request, Response} from 'express';
import {Controller, Get, Put, Post, Delete} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import axios from 'axios';

@Controller('cron')
export class CronController {

  private readonly API_KEY: string = '';

  @Get()
  private async fetchLatestCurrencies(req: Request, res: Response) {

    try {
      const data = await axios.get(`http://data.fixer.io/api/latest?access_key=${this.API_KEY}&format=1`, {timeout: 1500});
      Logger.Info(data, true);
      res.status(200).send(data.data);
    } catch (e) {
      Logger.Err(e, true);
      res.status(500).send('buh');
    }

  }

}
