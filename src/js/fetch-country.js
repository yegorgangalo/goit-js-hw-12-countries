function fetchCountries(countryName) {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
  return fetch(url)
    .then(res => res.json())
    .catch(console.error);
};

export default fetchCountries;