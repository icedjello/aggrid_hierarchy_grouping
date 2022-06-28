import { MOCK_DATA } from "./MockData";
import { CONTINENTS_WITH_COUNTRIES, COUNTRIES_WITH_CITIES } from './Utilities';
import { cloneDeep } from "lodash";

function getRowData(chosenContinent, chosenCountry, chosenCity) {
  if (chosenContinent == null && chosenCountry == null) { return []; }
  let result = cloneDeep(MOCK_DATA);
  if (chosenContinent) {
    result = result.filter(({ continent }) => continent === chosenContinent);
  }
  if (chosenCountry) {
    result = result.filter(({ country }) => country === chosenCountry);
  }
  if (chosenCity) {
    result = result.filter(({ city }) => city === chosenCity);
  }
  return result;
}


function mockServerRowDataRequest({ continent, country, city }) {
  const rowData = getRowData(continent, country, city);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(rowData)
    }, 500)
  })
}

function getCitiesByCountry(country) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(COUNTRIES_WITH_CITIES[country])
    }, 500)
  })
}

function getCountriesByContinent(continent) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(CONTINENTS_WITH_COUNTRIES[continent]);
    }, 500);
  });
}

export { mockServerRowDataRequest, getCitiesByCountry, getCountriesByContinent }
