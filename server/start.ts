import BucksServer from './BucksServer';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const clientPath = (process.env.NODE_ENV === 'production') ? './public' : '../client/public';
const exampleServer = new BucksServer(clientPath);
exampleServer.start(port);
