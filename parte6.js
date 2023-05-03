// Parte 6: Agregar una interfaz de usuario atractiva

const inputFields = document.querySelectorAll("input, select");
const resultContainer = document.getElementById("result-container");

// Estilos CSS para la interfaz de usuario
const styles = `
  .container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    font-family: Arial, sans-serif;
    color: #333;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
  }

  input[type="number"] {
    font-size: 16px;
    padding: 5px 10px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  select {
    font-size: 16px;
    padding: 5px 10px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #3e8e41;
  }

  #result-container {
    font-size: 20px;
    margin-top: 30px;
  }

  .error {
    color: red;
    font-weight: bold;
  }
`;

// Agregar los estilos CSS a la página
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Función para validar el formulario antes de enviar la solicitud de conversión
function validateForm(event) {
  event.preventDefault();
  const amountInput = document.getElementById("amount-input");
  const amount = amountInput.value;
  const fromCurrency = document.getElementById("from-currency-select").value;
  const toCurrency = document.getElementById("to-currency-select").value;

  if (amount === "" || isNaN(amount)) {
    alert("Por favor ingrese un monto válido.");
    amountInput.focus();
    return false;
  }

  if (fromCurrency === toCurrency) {
    alert("Por favor seleccione monedas diferentes para la conversión.");
    return false;
  }

  // Envía la solicitud de conversión si se han superado las validaciones
  convertCurrency(amount, fromCurrency, toCurrency);
}

// Agregar un manejador de eventos al botón de conversión
const conversionButton = document.getElementById("conversion-button");
conversionButton.addEventListener("click", validateForm);

// Agregar un manejador de eventos para actualizar los resultados cuando cambia una entrada
inputFields.forEach((input) => {
  input.addEventListener("change", () => {
    resultContainer.innerHTML = "";
  });
});

// Agregar una función para mostrar un mensaje de error si la solicitud falla
function displayError(message) {
  resultContainer.innerHTML = `<p class="error">${message}</p>`;
}
