import countryInfoHandleBar from '../template/country.hbs'
import countryManyHandleBar from '../template/many-countries.hbs'
// import '@pnotify/core/dist/BrightTheme.css'; //чому так не працює? Тільки при вставці в index.html
// import '@pnotify/core/dist/PNotify.css';
import { alert, notice, info, success, error } from '@pnotify/core';
//import { ul }  from './refs.js';// чому не працює відразу часткова деструктуризація { ul }?
import refs from './refs.js';

const { ul } = refs;

function updateMarkupCountry(dataObj, countryName) {
  console.log(dataObj);
  const { status, length } = dataObj;

  if (status === 404) {
        error({
          delay: 3000,
          width: '300px',
          text: 'There is no Country with such name! Try another.'
        });
        return;
      }
      if (length === 1) {
        const markUp = countryInfoHandleBar(dataObj);
        ul.classList.add('list');
        ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if(length > 1 && dataObj.some(elem => elem.name.toLowerCase() == countryName.toLowerCase())){
        const dataCountryName = dataObj.filter(elem => elem.name.toLowerCase() == countryName.toLowerCase());
        const markUp = countryInfoHandleBar(dataCountryName);
        ul.classList.add('list');
        ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (length > 1 && length <= 10 ) {
        ul.classList.remove('list');
        const markUp = countryManyHandleBar(dataObj);
        ul.insertAdjacentHTML('beforeend', markUp);
        return;
      }
      if (length > 10 ) {
        info({
          delay: 3000,
          width: '300px',
          text: 'There are to many variants! Try more specific name.'
        });
        return;
      }
};

export default updateMarkupCountry;