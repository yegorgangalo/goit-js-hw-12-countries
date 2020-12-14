import countryInfoHandleBar from '../template/country.hbs'
import countryManyHandleBar from '../template/many-countries.hbs'
const debounce = require('lodash.debounce');

import { alert, notice, info, success, error } from '@pnotify/core';

const refs = {
  body: document.querySelector('body'),
  ul: document.createElement('ul'),
  input: document.createElement('input'),
  label: document.createElement('h1'),
};

refs.ul.classList.add('country-list');
refs.input.classList.add('input')
refs.label.classList.add('input-label');
refs.body.append(refs.label);
refs.label.insertAdjacentHTML('beforeend', 'Input Country Name');
refs.body.append(refs.input);
refs.body.append(refs.ul);


refs.input.addEventListener('blur', event => event.target.value='');
refs.input.addEventListener('input', debounce(findCountry, 500));

function findCountry(event) {
  refs.ul.textContent = '';
  const country = event.target.value;
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status === 404) {
        error({
          delay: 3000,
          width: '300px',
          text: 'There is no Country with such name! Try another.'
        });
        return;
      }
      if (data.length === 1) {
        const markUp = countryInfoHandleBar(data);
        refs.ul.classList.add('list');
        refs.ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (data.length > 1 && data.length <= 10 ) {
        const markUp = countryManyHandleBar(data);
        refs.ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (data.length > 10 ) {
        info({
          delay: 3000,
          width: '300px',
          text: 'There are to many variants! Try more specific name.'
        });
        return;
      }
    })
    .catch(console.error);
};
