import {Request, Response} from 'express';
import {Controller, Get, Put, Post, Delete} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';


@Controller('api')
export class ApiController {

  @Get('currencies')
  private apiCurrencies(req: Request, res: Response) {
    const currencies = {
      base: 'USD',
      date: '2019-09-12',
      rates: {
        CAD: 1.260046,
        CHF: 0.933058,
        EUR: 0.806942,
        GBP: 0.719154,
      },
    };
    Logger.Info(currencies, true);
    res.status(200).json(currencies);
  }

}
