import request from 'supertest';
import BucksServer from '../server/BucksServer';
import {ApiController} from '../server/controllers';
import StorageRepository from '../server/data/StorageRepository';
import FakeStorageStream from './__fakes__/FakeStorageStream';

describe('Server', () => {
    it('echoes a message in the api', async () => {

      const cRates = {CAD: 1.260046, CHF: 0.933058, EUR: 0.806942, GBP: 0.719154 };
      const apiResponse = { rates: cRates };
      const server: BucksServer = new BucksServer(
        '',
        [new ApiController(new StorageRepository(new FakeStorageStream(apiResponse)))],
      );
      const response: request.Response = await request(server.getExpressApp())
        .get('/api/currencies');

      expect(response.ok).toBeTruthy();
      expect(response.body).toEqual(cRates);
    });

    it('serves a page not found page', async () => {
        const server: BucksServer = new BucksServer('', []);
        const response = await request(server.getExpressApp()).delete('/something-random');

        expect(response.notFound).toBeTruthy();
        expect(response.status).toEqual(404);
    });
});
