import { Server } from 'http';
import { ApiRequest } from './request.models';
import { ApiResponse } from './response.models';

export interface Api {
  addRoutes: (routes: ApiRoute[]) => void;
  run: () => HttpServer;
}

export type HttpServer = Server;

export enum ApiMethod {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
}

export interface ApiRoute {
  method: ApiMethod;
  route: string;
  handler: (req: ApiRequest, res: ApiResponse) => void;
}
