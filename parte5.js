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
  
  async function convertCurrency() {
    const amount = document.querySelector('#amount-input').value;
    const fromCurrency = document.querySelector('#from-currency-select').value;
    const toCurrency = document.querySelector('#to-currency-select').value;
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    document.querySelector('#result-container').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  }
  
  async function populateCurrencySelect() {
    const currencySelects = document.querySelectorAll('select');
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      const currencies = Object.keys(data.rates);
      currencySelects.forEach(select => {
        currencies.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.text = `${currency} - ${data.rates[currency]}`;
          select.appendChild(option);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  populateCurrencySelect();
  