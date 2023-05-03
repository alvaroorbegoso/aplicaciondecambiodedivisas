async function convertCurrency() {
    const amount = document.querySelector('#amount-input').value;
    const fromCurrency = document.querySelector('#from-currency-select').value;
    const toCurrency = document.querySelector('#to-currency-select').value;
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    document.querySelector('#result-container').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  }
  