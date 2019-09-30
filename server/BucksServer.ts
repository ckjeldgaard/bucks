import express, {Router} from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import cors from 'cors';
import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {Ctrl} from './controllers/Ctrl';
import GraphQLMiddleware from './model/schema/GraphQLMiddleware';
import * as http from 'http';

class BucksServer extends Server {
  private readonly router: Router;
  private readonly clientPath: string;
  private readonly controllers: Ctrl[];
  private readonly graphQlMiddleware?: GraphQLMiddleware;
  private httpServer?: http.Server;

  constructor(clientPath: string, controllers: Ctrl[], graphQlMiddleware?: GraphQLMiddleware) {
    super(true);
    this.clientPath = clientPath;
    this.controllers = controllers;
    this.graphQlMiddleware = graphQlMiddleware;

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cors({
      origin: 'http://localhost:8000',
    }));

    this.router = express.Router();

    const clientAbsolutePath = path.join(__dirname, this.clientPath);
    Logger.Info(`Serving static client resources from ${clientAbsolutePath}`);
    this.router.use(express.static(`${clientAbsolutePath}`));

    if (this.graphQlMiddleware) {
      this.app.use(
        this.graphQlMiddleware.endpoint(),
        this.graphQlMiddleware.buildGraphQL(),
      );
    }

    // Serving 404 Not found pages from client:
    this.router.use((req, res) => {
      if (req.accepts(`html`)) {
        return res.status(404).sendFile('index.html', { root: path.join(__dirname, `${this.clientPath}/404`) });
      }
    });

    this.setupControllers();
    this.app.use('/', this.router);
  }

  private setupControllers(): void {
    super.addControllers(this.controllers);
  }

  public start(port: number): void {
    this.httpServer = this.app.listen(port, () => {
      const env: string = (process.env.NODE_ENV === 'production') ? 'port ' : 'http://localhost:';
      Logger.Imp(`Server started on ${env}${port}`);
    });
  }

  public getExpressApp(): express.Application {
    return this.app;
  }

  public getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}

export default BucksServer;
