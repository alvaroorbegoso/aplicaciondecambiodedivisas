document.addEventListener("DOMContentLoaded", function() {
  const conversionButton = document.getElementById("conversion-button");
  const amountInput = document.getElementById("amount-input");
  const fromCurrencySelect = document.getElementById("from-currency-select");
  const toCurrencySelect = document.getElementById("to-currency-select");
  const resultContainer = document.getElementById("result-container");

  if (conversionButton) { // Verificar si el botón existe antes de agregar el evento
    conversionButton.addEventListener("click", function() {
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;

      if (isNaN(amount)) {
        resultContainer.innerHTML = "Ingrese una cantidad válida";
        return;
      }

      fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            resultContainer.innerHTML = `${amount} ${fromCurrency} = ${data.result} ${toCurrency}`;
          } else {
            resultContainer.innerHTML = "Ocurrió un error al obtener el tipo de cambio";
          }
        })
        .catch(error => {
          console.error(error);
          resultContainer.innerHTML = "Ocurrió un error al obtener el tipo de cambio";
        });
    });
  }
});
