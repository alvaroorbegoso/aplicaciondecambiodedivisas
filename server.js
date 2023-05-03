async function convertCurrency(amount, fromCurrency, toCurrency) {
    // código de la función convertCurrency
  }
  
  async function displayResult(convertedAmount, fromCurrency, toCurrency) {
    const resultEl = document.getElementById('result');
    const fromEl = document.getElementById('fromCurrency');
    const toEl = document.getElementById('toCurrency');
    const amountEl = document.getElementById('amount');
  
    fromEl.textContent = fromCurrency;
    toEl.textContent = toCurrency;
    amountEl.textContent = amount;
  
    resultEl.textContent = convertedAmount;
  }
  
  // Event listener para el botón de conversión
  document.getElementById('convertBtn').addEventListener('click', async () => {
    const amount = document.getElementById('amountInput').value;
    const fromCurrency = document.getElementById('fromCurrencySelect').value;
    const toCurrency = document.getElementById('toCurrencySelect').value;
  
    const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
  
    displayResult(convertedAmount, fromCurrency, toCurrency);
  });
  