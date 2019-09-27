import request from 'supertest';
import moxios from 'moxios';
import BucksServer from '../server/BucksServer';
import {CronController} from '../server/controllers';
import {Application} from 'express';
import ExternalApi from '../server/api/ExternalApi';
import FakeRepository from './__fakes__/FakeRepository';
import Rates from '../server/model/Rates';

const initServer = (apiResponse: Rates): Application => {
  const server: BucksServer = new BucksServer('', [new CronController(
    new ExternalApi(
      new FakeRepository(apiResponse),
    ),
  )]);
  return server.getExpressApp();
};

describe('Cron', () => {

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('It should fetch currencies from API', async () => {
    const url = `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}&format=1`;
    moxios.stubRequest(url, {
      status: 200,
      response: {
        data: 'currency data',
      },
    });
    const apiResponse = {DKK: 7.466899, NOK: 9.875919, SEK: 10.705554};
    const app = initServer(apiResponse);
    await request(app).get('/cron');
    expect(moxios.requests.mostRecent().url).toBe(url);
  });
});
