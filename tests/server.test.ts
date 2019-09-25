import request from 'supertest';
import BucksServer from '../server/BucksServer';
import {ApiController} from '../server/controllers';
import StorageRepository from '../server/data/StorageRepository';
import FakeStorageStream from './__fakes__/FakeStorageStream';

describe('Server', () => {
    it('echoes a message in the api', async () => {

      const apiResponse = { rates: {DKK: 7.466899, NOK: 9.875919, SEK: 10.705554 } };
      const server: BucksServer = new BucksServer(
        '',
        [],
        new ApiController(
          '/api/currencies',
          new StorageRepository(new FakeStorageStream(apiResponse)),
        ),
      );
      const response: request.Response = await request(server.getExpressApp())
        .post('/api/currencies')
        .send({ query: `{rate(id: ["DKK", "NOK", "SEK"]) {code}}`});

      expect(response.ok).toBeTruthy();
      expect(response.body).toEqual({
        data: {rate: [{code: 'DKK'}, {code: 'NOK'}, {code: 'SEK'}]},
      });
    });

    it('serves a page not found page', async () => {
        const server: BucksServer = new BucksServer('', []);
        const response = await request(server.getExpressApp()).delete('/something-random');

        expect(response.notFound).toBeTruthy();
        expect(response.status).toEqual(404);
    });
});
