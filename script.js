const baseCurrencySelect = document.getElementById('baseCurrency');
const targetCurrencySelect = document.getElementById('targetCurrency');
const resultDiv = document.getElementById('result');


fetch('https://www.frankfurter.app/currencies')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data);
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = currency;
      option1.text = option2.text = currency;
      baseCurrencySelect.add(option1);
      targetCurrencySelect.add(option2);
    });
  })
  .catch(error => console.error('Error fetching currencies:', error));

function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const baseCurrency = baseCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;

  if (amount <= 0 || baseCurrency === targetCurrency) {
    resultDiv.innerHTML = 'Veuillez entrer un montant positif et sélectionner des devises différentes.';
    return;
  }


  fetch(`https://www.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`)
    .then(response => response.json())
    .then(data => {
      const conversionResult = data.rates[targetCurrency];
      resultDiv.innerHTML = `Le résultat de la conversion est: ${conversionResult.toFixed(2)} ${targetCurrency}`;
    })
    .catch(error => {
      resultDiv.innerHTML = 'Une erreur s\'est produite lors de la conversion.';
      console.error('Error converting currency:', error);
    });
}
