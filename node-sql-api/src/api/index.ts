import { createApi } from './api';
import { v1_routes } from './v1';

export const api = createApi();
api.addRoutes(v1_routes);
