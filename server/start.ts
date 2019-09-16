import BucksServer from './BucksServer';

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const clientPath = (process.env.NODE_ENV === 'production') ? './public' : '../client/public';
const exampleServer = new BucksServer(clientPath);
exampleServer.start(port);
