// Punto 1: Obtener los valores de cambio y almacenarlos en una variable
const API_KEY = 'tu_api_key';
const URL = `https://api.cambio.today/v1/full/${API_KEY}/USD/json`;
let exchangeRates;

fetch(URL)
  .then(response => response.json())
  .then(data => exchangeRates = data.result)
  .catch(error => console.log(error));

// Punto 2: Obtener los elementos del DOM y almacenarlos en variables
const inputAmount = document.getElementById('input-amount');
const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const outputAmount = document.getElementById('output-amount');

// Punto 3: Agregar un event listener al botón de conversión
const convertButton = document.getElementById('convert-button');
convertButton.addEventListener('click', convertCurrency);

// Punto 4: Función para convertir la moneda
function convertCurrency() {
  const from = inputCurrency.value;
  const to = outputCurrency.value;
  const rate = exchangeRates[from][to];
  const result = inputAmount.value * rate;
  outputAmount.value = result.toFixed(2);
}

// Punto 5: Agregar las opciones de moneda al select inputCurrency y outputCurrency
const currencySelects = document.querySelectorAll('select');

fetch('https://api.cambio.today/v1/currencies')
  .then(response => response.json())
  .then(data => {
    const currencies = data.result;
    currencySelects.forEach(select => {
      for (const currency in currencies) {
        const option = document.createElement('option');
        option.text = currency;
        option.value = currency;
        select.add(option);
      }
    });
  })
  .catch(error => console.log(error));

// Punto 6: Actualizar los valores de cambio cada 30 segundos
setInterval(() => {
  fetch(URL)
    .then(response => response.json())
    .then(data => exchangeRates = data.result)
    .catch(error => console.log(error));
}, 30000);
