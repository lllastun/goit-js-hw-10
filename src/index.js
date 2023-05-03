import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputElement = document.querySelector('#search-box');
const bodyElement = document.querySelector('body');
const listOfCountryElement = document.querySelector('.country-list');
const countryInfoElement = document.querySelector('.country-info');
const style = document.createElement('style');
style.textContent =
  'body {font-size: 30px; line-height: 1.5; font-weight: 600;} ul { list-style-type: none; margin-left: 40%; line-height: 2} .country-info {font-size: 22px; margin: auto;  width: 300px; } #search-box {margin-top: 50px}';
document.head.appendChild(style);

bodyElement.style.cssText =
  'background-image: radial-gradient(#D1D1D1 10%, transparent 10%); background-size: 10px 10px; background-color: #babafa;';
inputElement.style.cssText =
  'margin-left: auto; margin-right: auto; display: block';

const debounceInput = debounce(handleInput, DEBOUNCE_DELAY);

function handleInput(event) {
  const inputValue = event.target.value.trim();
  if (!inputValue.length) return;
  fetchCountries(inputValue)
    .then(data => {
      const isGood = data.length ?? false;
      if (!isGood) {
        throw new Error(data.status);
      }
      if (data.length > 10) {
        clearOutput();
        Notify.success(
          `Too many matches found. Please enter a more specific name.`
        );
      }
      if (1 === data.length) {
        clearOutput();
        outputCountry(data[0]);
        outputCountryInfo(data[0]);
      }
      if ((2 <= data.length) & (data.length <= 10)) {
        clearOutput();
        data.forEach(element => {
          outputCountry(element);
        });
      }
    })
    .catch(error => {
      clearOutput();
    });
}

function outputCountry(element) {
  listOfCountryElement.insertAdjacentHTML(
    'afterbegin',
    `<li class="country-item"> 
    <span class="flag-span"> 
    <img  src="${element.flags.svg}" width="100" alt="Flag of ${element.name.official}"> </span>
    ${element.name.official}`
    );
  }
  
  function clearOutput() {
    listOfCountryElement.innerHTML = '';
    countryInfoElement.innerHTML = '';
  }
  
function outputCountryInfo(country) {
  const population = country.population.toLocaleString('ru-RU');
  const languages = Object.values(country.languages).join(', ');
  countryInfoElement.insertAdjacentHTML(
    'afterbegin',
    `<p>Capital: ${country.capital}</p><p>Population: ${population}</p><p>Languages: ${languages}</p>`
    );
  }
  
  inputElement.addEventListener('input', debounceInput);