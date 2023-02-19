export type ICurrency = 'EUR' | 'USD' | 'UAH';

export interface IResponse {
  ccy: ICurrency;
  base_ccy: ICurrency;
  buy: number;
  sale: number;
}
