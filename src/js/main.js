const debounce = require('lodash.debounce');
import refs from './refs.js';
import './static-markup.js';
import fetchCountries from './fetchCountries.js';
import updateMarkupCountry from './update-markup-country.js';

const { input, ul } = refs;

input.addEventListener('blur', ({target}) => target.value='');
input.addEventListener('input', debounce(findCountry, 500));

function findCountry({target}) {
  ul.textContent = '';
  const country = target.value;
  if (!country) {
    return;
  };
  fetchCountries(country)
    .then(data => updateMarkupCountry(data, country));

};

