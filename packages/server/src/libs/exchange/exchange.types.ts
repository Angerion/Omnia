export enum EnumCurrency {
  AUD = 'AUD',
  BGN = 'BGN',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  CNY = 'CNY',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  HKD = 'HKD',
  HRK = 'HRK',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  INR = 'INR',
  ISK = 'ISK',
  JPY = 'JPY',
  KRW = 'KRW',
  MXN = 'MXN',
  MYR = 'MYR',
  NOK = 'NOK',
  NZD = 'NZD',
  PHP = 'PHP',
  PLN = 'PLN',
  RON = 'RON',
  RUB = 'RUB',
  SEK = 'SEK',
  SGD = 'SGD',
  THB = 'THB',
  TRY = 'TRY',
  USD = 'USD',
  ZAR = 'ZAR',
}
export type Currency = keyof typeof EnumCurrency;

function getValidCurrencies(): Currency[] {
  return Object.values(EnumCurrency) as Currency[];
}