import express from 'express';
import { Api, ApiRoute, HttpServer } from './models';
import { serverPort } from '../config';

export const createApi = (): Api => {
  const server = express();

  const run = (): HttpServer => {
    return server.listen(serverPort, () => {
      console.info('Node server started..');
      console.info(`http://localhost:${serverPort}`);
    });
  };

  const addRoutes = (routes: ApiRoute[]): void => {
    routes.forEach((x) => {
      server[x.method](x.route, x.handler);
    });
  };

  return {
    addRoutes,
    run,
  };
};
