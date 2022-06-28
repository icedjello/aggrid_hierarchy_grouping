import { START_STRUCTURE } from "./MockData";

const NO_SELECTION = 'No Selection';

const CONTINENTS = Object.keys(START_STRUCTURE);

const CONTINENTS_WITH_COUNTRIES = (function (baseStructure = START_STRUCTURE) {
  let result = {};
  for (const [continent, value] of Object.entries(baseStructure)) {
    result[continent] = Object.keys(value);
  };
  return result;
})()

const COUNTRIES_WITH_CITIES = (function (baseStructure = START_STRUCTURE) {
  let result = {};
  Object.values(baseStructure).forEach(continent => {
    Object.entries(continent).forEach(([country, cities]) => {
      result[country] = Object.keys(cities);
    })
  })
  return result;
})()

/* INDIVIDUAL COLUMNS */
const COUNTRY = {
  field: 'country', rowGroup: true, hide: true
};
const CITY = {
  field: 'city', rowGroup: true, hide: true
};

const MONTH = {
  field: 'month', rowGroup: true, hide: true
};
const YEAR = {
  field: 'year', rowGroup: true, hide: true
};
const SALES = {
  field: 'sales', aggFunc: 'sum'
};
/*END OF INDIVIDUAL COLUMNS */

const COLUMN_DEFINITIONS = {
  NOTHING_SELECTED: [],
  CONTINENT_SELECTED: [
    COUNTRY, YEAR, MONTH, SALES
  ],
  COUNTRY_SELECTED: [
    CITY, YEAR, MONTH, SALES
  ],
  CITY_SELECTED: [
    YEAR, MONTH, SALES
  ]
};

export {
  NO_SELECTION,
  CONTINENTS,
  CONTINENTS_WITH_COUNTRIES,
  COUNTRIES_WITH_CITIES,
  COLUMN_DEFINITIONS
};
