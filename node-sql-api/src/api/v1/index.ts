import { ApiMethod, ApiRoute } from '../models';
import healthCheckHandler from './handlers/healthcheck.handler';
import getProductsHandler from './handlers/products.handler';

export const v1_routes: ApiRoute[] = [
  {
    method: ApiMethod.GET,
    route: '/v1/health',
    handler: healthCheckHandler,
  },
  {
    method: ApiMethod.GET,
    route: '/v1/products',
    handler: getProductsHandler,
  },
];
