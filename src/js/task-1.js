import countryInfoHandleBar from '../template/country.hbs'
import countryManyHandleBar from '../template/many-countries.hbs'
const debounce = require('lodash.debounce');

// import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
//   import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//   defaultModules.set(PNotifyMobile, {});

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
        console.log('there is no country with such name');
        // alert({
        //   text: 'Notice me, senpai!'
        // });
        return;
      }
      if (data.length < 4) {
        const markUp = countryInfoHandleBar(data);
        refs.ul.classList.add('list');
        refs.ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (data.length >= 4 && data.length <= 10 ) {
        const markUp = countryManyHandleBar(data);
        refs.ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (data.length > 10 ) {
        console.log('there is to many countries');
        return;
      }
    })
    .catch(console.error);
};
