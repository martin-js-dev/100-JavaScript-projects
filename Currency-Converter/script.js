'use strict'
// button convert
let btnConvert = document.querySelector('button');
btnConvert.addEventListener('click', convertDollar);

//CONVERT DOLLAR
function convertDollar() {

  let dollar = {
    input: document.querySelector('input').value,
    output: ''
  }

  let wrapper = document.querySelector('.wrapper');

  if (document.querySelector('table')) document.querySelector('table').remove();
  if (document.querySelector('.result')) document.querySelector('.result').remove();

  // SPLIT TO COINS function
  function splitDollar(number) {

    let penny, nickel, dime, quarter, balance;
    quarter = Math.floor(number / 25);
    balance = number % 25;
    dime = Math.floor(number / 10);
    balance = balance % 10;
    nickel = Math.floor(number / 5);
    balance = balance % 5;
    penny = Math.floor(number / 1);

    return `<table >
              <tr >
                <td>Coins</td>
                <td>Count</td>
              </tr>
              <tr >
                <td>Quarters (25 &#162)</td>
                <td>${quarter}</td>
              </tr>
              <tr >
                <td>Dimes (10 &#162)</td>
                <td>${dime}</td>
              </tr>
              <tr >
                <td>Nickels (5 &#162)</td>
                <td>${nickel}</td>
              </tr>
              <tr >
                <td>Pennies (1 &#162)</td>
                <td>${penny}</td>
              </tr>
            </table>`;
  }

  // CHECK USER INPUT
  if (!(Number.isFinite(+dollar.input)) || dollar.input.indexOf('-') != -1) dollar.output = `<p class="result">This is incorrect value</p>`;
  else {

    let cents;

    if (dollar.input.indexOf('.') != -1 && dollar.input.indexOf('.') < dollar.input.length - 3) {
      dollar.output = `<p class="result">This is incorrect value</p>`;
    } else {

      cents = Math.round(+dollar.input * 100);
      dollar.output = `<p class="result">Total cents: ${cents}</p>` + splitDollar(cents);
    }
  }

  wrapper.insertAdjacentHTML('beforeend', dollar.output);
}
