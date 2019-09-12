import request from 'supertest';
import BucksServer from '../server/BucksServer';

describe('Server', () => {
    it('echoes a message in the api', async () => {

        const server: BucksServer = new BucksServer('');
        const response: request.Response = await request(server.getExpressApp()).get('/api/currencies');

        expect(response.ok).toBeTruthy()
        expect(response.body).toEqual({
          base: 'USD',
          date: '2019-09-12',
          rates: { CAD: 1.260046, CHF: 0.933058, EUR: 0.806942, GBP: 0.719154 },
        });
    });

    it('serves a page not found page', async () => {
        const server: BucksServer = new BucksServer('');
        const response = await request(server.getExpressApp()).delete('/something-random');

        expect(response.notFound).toBeTruthy();
        expect(response.status).toEqual(404);
    });
});
