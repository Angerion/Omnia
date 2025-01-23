import wretch from 'wretch';
import log from "encore.dev/log";

export class CnbExchangeRate {
  // Exchange rates object
  public exchangeRates: {
    [year: string]: {
      [date: string]: {
        [currencyCode: string]: number;
      };
    };
  } = {};

  public currencyAmounts: { [currencyCode: string]: number } = {};

  constructor() {

  }
  // Helper function to parse date strings into comparable numbers
  private parseDateString(dateStr: string): number {
    const [year, month, day] = dateStr.split('-').map(Number);
    return year * 10000 + month * 100 + day;
  }



  public async getYearlyExchangeRates(year: string): Promise<void> {
    if (this.exchangeRates[year]) {
      // Exchange rates for this year already fetched
      return;
    }

    const url = `https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/year.txt?year=${year}`;

    try {
      const responseText = await wretch(url).get().text();

      // Parse the responseText
      const lines = responseText.split('\n');
      if (lines.length < 2) {
        throw new Error('Invalid exchange rates data');
      }

      // The first line contains headers
      const [headersLine, ...dataLines] = lines;
      const headerItems = headersLine.split('|');
      const currencyInfoArray = headerItems.slice(1).map(header => {
        // Header format: 'amount currencyCode', e.g., '1 EUR' or '100 JPY'
        const [amountStr, ...currencyCodeParts] = header.trim().split(' ');
        const amount = parseInt(amountStr);
        const currencyCode = currencyCodeParts.join(' ');

        // Store the amount for the currency code
        this.currencyAmounts[currencyCode] = amount;

        return { amount, currencyCode };
      });

      // Initialize the exchangeRates for the year
      this.exchangeRates[year] = {};

      for (const line of dataLines) {
        if (line.trim() === '') continue;

        const [dateLine, ...rates] = line.split('|');
        const dateParts = dateLine.trim().split('.'); // 'DD.MM.YYYY'
        const date = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`; // Convert to 'YYYY-MM-DD'

        // Initialize exchangeRates for the date
        this.exchangeRates[year][date] = {};

        rates.forEach((rateStr, index) => {
          const rate = parseFloat(rateStr.replace(',', '.'));
          const { amount, currencyCode } = currencyInfoArray[index];
          if (!isNaN(rate)) {
            // Adjust the rate to be per unit currency
            const ratePerUnit = rate / amount;
            this.exchangeRates[year][date][currencyCode] = ratePerUnit;
          }
        });
      }

      log.debug(`Exchange rates for year ${year} fetched and stored.`);
    } catch (err) {
      log.error(`Error fetching exchange rates for year ${year}: ${err}`);
      throw err;
    }
  }


  public async getExchangeRate(requestedDate: string, currencyCode: string): Promise<number> {
    const year = requestedDate.slice(0, 4);

    // Ensure exchange rates for the year are fetched
    if (!this.exchangeRates[year]) {
      await this.getYearlyExchangeRates(year);
    }

    // Check if exchange rates for the requested date are available
    if (
      this.exchangeRates[year][requestedDate] &&
      this.exchangeRates[year][requestedDate][currencyCode]
    ) {
      return this.exchangeRates[year][requestedDate][currencyCode];
    }

    // If not, find the closest previous date
    const availableDates = Object.keys(this.exchangeRates[year]).sort((a, b) => {
      return this.parseDateString(b) - this.parseDateString(a);
    });

    for (const availableDate of availableDates) {
      if (
        this.parseDateString(availableDate) <= this.parseDateString(requestedDate) &&
        this.exchangeRates[year][availableDate][currencyCode]
      ) {
        log.debug(`Using exchange rates from ${availableDate} instead of ${requestedDate}`);
        return this.exchangeRates[year][availableDate][currencyCode];
      }
    }

    // If no exchange rates are found, query the CNB API for the requested date
    const responseDate = await this.getExchangeRatesForDate(requestedDate);

    // Try to get the exchange rate using the responseDate
    const responseYear = responseDate.slice(0, 4);
    if (
      this.exchangeRates[responseYear][responseDate] &&
      this.exchangeRates[responseYear][responseDate][currencyCode]
    ) {
      log.debug(`Using exchange rates from ${responseDate} instead of ${requestedDate}`);
      return this.exchangeRates[responseYear][responseDate][currencyCode];
    }

    // If still not found, try to find the closest previous date in the updated cache
    const updatedAvailableDates = Object.keys(this.exchangeRates[responseYear]).sort((a, b) => {
      return this.parseDateString(b) - this.parseDateString(a);
    });

    for (const availableDate of updatedAvailableDates) {
      if (
        this.parseDateString(availableDate) <= this.parseDateString(responseDate) &&
        this.exchangeRates[responseYear][availableDate][currencyCode]
      ) {
        log.debug(`Using exchange rates from ${availableDate} instead of ${requestedDate}`);
        return this.exchangeRates[responseYear][availableDate][currencyCode];
      }
    }

    // If still not found, throw error
    throw new Error(
      `Exchange rate for currency ${currencyCode} not found on or before ${requestedDate}`
    );
  }


  private async getExchangeRatesForDate(requestedDate: string): Promise<string> {
    const dateParts = requestedDate.split('-'); // 'YYYY-MM-DD'
    const dateFormatted = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`; // 'DD.MM.YYYY'

    const url = `https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt?date=${dateFormatted}`;

    try {
      const responseText = await wretch(url).get().text();

      // Parse the responseText
      const lines = responseText.split('\n');
      if (lines.length < 2) {
        throw new Error('Invalid exchange rates data');
      }

      // The first line contains the date returned by the API
      const [responseDateLine, headersLine, ...dataLines] = lines;
      const [responseDate] = responseDateLine.split(' ');

      // Convert responseDate to 'YYYY-MM-DD' format
      const responseDateParts = responseDate.trim().split('.'); // 'DD.MM.YYYY'
      const responseDateFormatted = `${responseDateParts[2]}-${responseDateParts[1].padStart(2, '0')}-${responseDateParts[0].padStart(2, '0')}`;

      const headerItems = headersLine.split('|');
      // The headers are: 'Country|Currency|Amount|Code|Rate'

      // Initialize the exchangeRates for the year and date if not already present
      const year = responseDateParts[2];
      if (!this.exchangeRates[year]) {
        this.exchangeRates[year] = {};
      }
      if (!this.exchangeRates[year][responseDateFormatted]) {
        this.exchangeRates[year][responseDateFormatted] = {};
      }

      for (const line of dataLines) {
        if (line.trim() === '') continue;
        const [country, currencyName, amountStr, currencyCode, rateStr] = line.split('|');
        const amount = parseInt(amountStr);
        const rate = parseFloat(rateStr.replace(',', '.'));
        if (!isNaN(rate) && amount) {
          const ratePerUnit = rate / amount;
          this.exchangeRates[year][responseDateFormatted][currencyCode] = ratePerUnit;
        }
      }

      log.debug(`Exchange rates for date ${responseDateFormatted} fetched and stored.`);
      return responseDateFormatted; // Return the date from the API response
    } catch (err) {
      log.error(`Error fetching exchange rates for date ${requestedDate}: ${err}`);
      throw err;
    }
  }

}