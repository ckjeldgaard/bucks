import request from 'supertest';
import BucksServer from '../server/BucksServer';
import {ApiController} from '../server/controllers';
import FakeRepository from './__fakes__/FakeRepository';

describe('Server', () => {
    it('echoes a message in the api', async () => {

      const apiResponse = {DKK: 7.466899, NOK: 9.875919, SEK: 10.705554 };
      const server: BucksServer = new BucksServer(
        '',
        [],
        new ApiController(
          '/api/currencies',
          new FakeRepository(apiResponse),
        ),
      );
      const response: request.Response = await request(server.getExpressApp())
        .post('/api/currencies')
        .send({ query: `{rate(id: ["DKK", "NOK", "SEK"]) {code, rate}}`});

      expect(response.ok).toBeTruthy();
      expect(response.body).toEqual({
        data: {
          rate: [
            { code: 'DKK', rate: 7.466899},
            { code: 'NOK', rate: 9.875919},
            { code: 'SEK', rate: 10.705554},
          ],
        },
      });
    });

    it('serves a page not found page', async () => {
        const server: BucksServer = new BucksServer('', []);
        const response = await request(server.getExpressApp()).delete('/something-random');

        expect(response.notFound).toBeTruthy();
        expect(response.status).toEqual(404);
    });
});
