import countryHandleBar from '../template/country.hbs'
const debounce = require('lodash.debounce');

const refs = {
  body: document.querySelector('body'),
  ul: document.createElement('ul'),
  input: document.createElement('input'),
};

refs.ul.classList.add('list');
refs.body.append(refs.input);
refs.body.append(refs.ul);

refs.input.addEventListener('input', debounce(findCountry, 500));

function findCountry(event) {
  refs.ul.textContent = '';
  const country = event.target.value;
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const markUp = countryHandleBar(data);
      refs.ul.insertAdjacentHTML('beforeend', markUp);
      event.target.value = '';
    })
    .catch(console.error);
};
