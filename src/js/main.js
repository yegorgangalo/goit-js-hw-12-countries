const debounce = require('lodash.debounce');
import refs from './refs.js';
import './static-markup.js';
import fetchCountries from './fetchCountries.js';
import updateMarkupCountry from './update-markup-country.js';

const { input, ul } = refs;

/* ------------------------------ */
import { Spinner } from 'spin.js';
const opts = {
  color: 'rgba(0, 0, 0, 0.5)',
};
const spinner = new Spinner(opts);
/* ------------------------------ */

input.addEventListener('blur', ({target}) => target.value='');
input.addEventListener('input', debounce(findCountry, 500));

function findCountry({target}) {
  ul.textContent = '';
  const country = target.value;
  if (!country) {
    return;
  };
  spinner.spin(ul);

  fetchCountries(country)
    .then(data => updateMarkupCountry(data, country)).finally(()=>{spinner.stop()});

};

