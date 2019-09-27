import request from 'supertest';
import moxios from 'moxios';
import BucksServer from '../server/BucksServer';
import {CronController} from '../server/controllers';
import {Application} from 'express';

const initServer = (): Application => {
  const server: BucksServer = new BucksServer('', [new CronController()]);
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
    const app = initServer();
    await request(app).get('/cron');
    expect(moxios.requests.mostRecent().url).toBe(url);
  });
});
