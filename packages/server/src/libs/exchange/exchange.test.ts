import { describe, test, expect, beforeEach, afterEach, vi, Mock } from "vitest";
import { getYearlyRates, getRate } from "./exchange";
import { CnbExchangeRate } from "./exchange-cnb";
import { Currency } from "./exchange.types";

vi.mock("./exchange-cnb");

describe("Exchange Service", () => {
  let exchangeRateService: CnbExchangeRate;
  let mockGetYearlyExchangeRates: Mock;
  let mockGetExchangeRate: Mock;

  beforeEach(() => {
    exchangeRateService = new CnbExchangeRate();
    mockGetYearlyExchangeRates = vi.fn().mockResolvedValue(undefined);
    mockGetExchangeRate = vi.fn().mockResolvedValue(1.2345);
    exchangeRateService.getYearlyExchangeRates = mockGetYearlyExchangeRates;
    exchangeRateService.getExchangeRate = mockGetExchangeRate;
    (CnbExchangeRate as Mock).mockImplementation(() => exchangeRateService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getYearlyRates should fetch yearly exchange rates", async () => {
    const year = 2025;

    await getYearlyRates({year});

    expect(mockGetYearlyExchangeRates).toHaveBeenCalledWith(year);
  });

  test("getRate should fetch exchange rate for a specific date and currency", async () => {
    const date = "2021-01-01";
    const currency: Currency = "USD";
    const expectedRate = 1.2345;

    const result = await getRate({date, currency});

    expect(mockGetExchangeRate).toHaveBeenCalledWith(date, currency);
    expect(result).toEqual({ rate: expectedRate });
  });
});
