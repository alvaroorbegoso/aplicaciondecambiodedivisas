const url = 'https://api.exchangerate-api.com/v4/latest/';

async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const response = await fetch(`${url}${fromCurrency}`);
    const data = await response.json();
    const exchangeRate = data.rates[toCurrency];
    return exchangeRate;
  } catch (error) {
    console.log(error);
  }
}
