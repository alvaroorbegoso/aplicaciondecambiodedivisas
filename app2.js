// URL de la API de conversión de divisas
const exchangeRateAPI = 'https://api.exchangerate-api.com/v4/latest/';

// Objeto para almacenar los tipos de cambio
const exchangeRates = {};

// Función para obtener los tipos de cambio de una moneda base
async function getExchangeRates(baseCurrency) {
  const response = await fetch(`${exchangeRateAPI}${baseCurrency}`);
  const data = await response.json();
  return data.rates;
}

// Función para convertir una cantidad de una moneda a otra
async function convertCurrency(amount, fromCurrency, toCurrency) {
  // Si no hemos obtenido los tipos de cambio para la moneda de origen, los obtenemos
  if (!exchangeRates[fromCurrency]) {
    exchangeRates[fromCurrency] = await getExchangeRates(fromCurrency);
  }

  // Obtenemos el tipo de cambio de la moneda de origen a la moneda de destino
  const exchangeRate = exchangeRates[fromCurrency][toCurrency];

  // Calculamos la cantidad convertida
  const convertedAmount = amount * exchangeRate;

  // Devolvemos la cantidad convertida redondeada a 2 decimales
  return Math.round(convertedAmount * 100) / 100;
}

// Función para actualizar la interfaz con el resultado de la conversión
function updateUI(convertedAmount, fromCurrency, toCurrency) {
  // Obtenemos los elementos de la interfaz que necesitamos actualizar
  const fromAmountElem = document.getElementById('fromAmount');
  const toAmountElem = document.getElementById('toAmount');
  const fromCurrencyElem = document.getElementById('fromCurrency');
  const toCurrencyElem = document.getElementById('toCurrency');

  // Actualizamos los valores de los elementos
  fromAmountElem.value = '';
  toAmountElem.value = convertedAmount;
  fromCurrencyElem.textContent = fromCurrency;
  toCurrencyElem.textContent = toCurrency;
}

// Función para manejar el envío del formulario
async function handleSubmit(event) {
  // Prevenimos el comportamiento por defecto del formulario
  event.preventDefault();

  // Obtenemos los valores de los campos del formulario
  const amount = parseFloat(document.getElementById('fromAmount').value);
  const fromCurrency = document.getElementById('fromCurrencyCode').value;
  const toCurrency = document.getElementById('toCurrencyCode').value;

  // Si la cantidad no es un número válido, mostramos un mensaje de error
  if (isNaN(amount)) {
    alert('Por favor ingrese una cantidad válida.');
    return;
  }

  // Convertimos la cantidad a la moneda de destino
  const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

  // Actualizamos la interfaz con el resultado de la conversión
  updateUI(convertedAmount, fromCurrency, toCurrency);
}

// Asignamos el manejador de eventos para el envío del formulario
const form = document.getElementById('currencyConverter');
form.addEventListener('submit', handleSubmit);
