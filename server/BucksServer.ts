import express, {Router} from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {Ctrl} from './controllers/Ctrl';

class BucksServer extends Server {
  private readonly router: Router;
  private readonly clientPath: string;

  private readonly controllers: Ctrl[];

  constructor(clientPath: string, controllers: Ctrl[]) {
    super(true);
    this.clientPath = clientPath;
    this.controllers = controllers;

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    this.router = express.Router();

    const clientAbsolutePath = path.join(__dirname, this.clientPath);
    Logger.Info(`Serving static client resources from ${clientAbsolutePath}`);
    this.router.use(express.static(`${clientAbsolutePath}`));

    this.router.use((req, res) => {
      if (req.accepts(`html`)) {
        return res.status(404).sendFile('index.html', { root: path.join(__dirname, `${this.clientPath}/404`) });
      }
    });

    this.setupControllers();
    this.app.use('/', this.router);
  }

  private setupControllers(): void {
    /* const ctrlInstances = [];
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name) && name !== '__esModule') {
        const controller = (controllers as any)[name];
        ctrlInstances.push(
          new controller(new StorageRepository('bucks-conversion-rates', 'rates.json'))
        );
      }
    } */
    super.addControllers(this.controllers);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      const env: string = (process.env.NODE_ENV === 'production') ? 'port ' : 'http://localhost:';
      Logger.Imp(`Server started on ${env}${port}`);
    });
  }

  public getExpressApp(): express.Application {
    return this.app;
  }
}

export default BucksServer;
