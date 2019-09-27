import BucksServer from './BucksServer';
import dotenv from 'dotenv';
import {ApiController, CronController} from './controllers';
import DatastoreRepository from './data/DatastoreRepository';
import ExternalApi from './api/ExternalApi';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const clientPath = (process.env.NODE_ENV === 'production') ? './public' : '../client/public';
const repository = new DatastoreRepository();

const server = new BucksServer(
  clientPath,
  [
    new CronController(
      new ExternalApi(repository),
    ),
  ],
  new ApiController(
    '/api/currencies',
    repository,
  ),
);
server.start(port);
export default server;
