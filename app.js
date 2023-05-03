
  // Aquí agregamos el código sugerido para la mejora de la aplicación
  const exchangeRateAPI = 'https://api.frankfurter.app/latest';
  const exchangeRates = {};

  async function getExchangeRates(baseCurrency) {
    const response = await fetch(`${exchangeRateAPI}?base=${baseCurrency}`);
    const data = await response.json();
    return data.rates;
  }

  async function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency]) {
      exchangeRates[fromCurrency] = await getExchangeRates(fromCurrency);
    }

    const exchangeRate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * exchangeRate;
    return convertedAmount;
  }

