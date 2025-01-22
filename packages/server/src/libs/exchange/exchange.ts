import { api } from "encore.dev/api";
import log  from "encore.dev/log";
import { CnbExchangeRate } from "./exchange-cnb.js";
import { EnumCurrency, Currency } from "./exchange.types";

log.trace("Starting exchange service");
const exchangeRateService = new CnbExchangeRate();
// get exchange rates for this year
exchangeRateService.getYearlyExchangeRates(new Date().getFullYear().toString());

// ==================================================================
// API endpoints
// ==================================================================


/**
 * Fetches the yearly exchange rates for a given year.
 *
 * @param {Object} params - The parameters for the API call.
 * @param {number} params.year - The year for which to fetch the exchange rates.
 * @returns {Promise<void>} A promise that resolves when the exchange rates have been fetched.
 */
export const getYearlyRates = api(
  { expose: false, method: "GET", path: "/exchange/:year" },
  async ({ year }: { year: number }): Promise<void> => {
    await exchangeRateService.getYearlyExchangeRates(year.toString());
  }
);

/**
 * Retrieves the exchange rate for a given date and currency.
 *
 * @param date - The date for which to retrieve the exchange rate.
 * @param currency - The currency code for which to retrieve the exchange rate.
 * @returns An object containing the exchange rate.
 */
export const getRate = api(
  { expose: true, method: "GET", path: "/exchange/:date/:currency" },
  async ({ date, currency }: { date: string; currency: string }): Promise<{ rate: number }> => {
    // Convert and validate the `currency` string
    const currencyEnum = validateCurrency(currency);
    const rate = await exchangeRateService.getExchangeRate(date, currencyEnum);
    return { rate };
  }
);

/**
 * Validates and maps the currency string to the `Currency` type.
 *
 * @param currency - The currency string from the path.
 * @returns The corresponding `Currency` enum value.
 * @throws An error if the currency is invalid.
 */
function validateCurrency(currency: string): Currency {
  const validCurrencies = getValidCurrencies();
  if (!validCurrencies.includes(currency as Currency)) {
    throw new Error(`Invalid currency: ${currency}`);
  }
  return currency as Currency;
}

/**
 * Retrieves the valid currencies from the `EnumCurrency` type.
 *
 * @returns An array of valid currency strings.
 */
function getValidCurrencies(): Currency[] {
  return Object.values(EnumCurrency) as Currency[];
}