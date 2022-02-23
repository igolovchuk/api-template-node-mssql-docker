import { Response } from 'express';

export type ApiResponse = Response;

export interface Product {
  ID: string;
  ProductName: string;
}
