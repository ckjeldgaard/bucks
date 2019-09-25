import BucksServer from './BucksServer';
import dotenv from 'dotenv';
import {ApiController, CronController} from './controllers';
import StorageRepository from './data/StorageRepository';
import GoogleStorageStream from './data/stream/GoogleStorageStream';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const clientPath = (process.env.NODE_ENV === 'production') ? './public' : '../client/public';

const server = new BucksServer(
  clientPath,
  [
    new CronController(),
  ],
  new ApiController(
    '/api/currencies',
    new StorageRepository(
      new GoogleStorageStream('bucks-conversion-rates', 'rates.json'),
    ),
  ),
);
server.start(port);
