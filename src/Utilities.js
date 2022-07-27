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
  headerName: 'Country',
  showRowGroup: 'country',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { suppressCount: true }
};
const COUNTRY_HIDDEN = {
  field: 'country',
  rowGroup: true,
  hide: true
}

const CITY = {
  headerName: 'City',
  showRowGroup: 'city',
  // valueFormatter: params => { console.log(params.node.key) },
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { suppressCount: true }
};
const CITY_HIDDEN = {
  field: 'city',
  rowGroup: true,
  hide: true
};

const MONTH = {
  headerName: 'Month',
  showRowGroup: 'month',
};

const MONTH_HIDDEN = {
  field: 'month',
  rowGroup: true,
  hide: true,
  keyCreator: ({ value }) => ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][value]

}

const YEAR = {
  headerName: 'Year',
  showRowGroup: 'year',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { suppressCount: true }
};
const YEAR_HIDDEN = {
  field: 'year',
  rowGroup: true,
  hide: true
}

const SALES = {
  field: 'sales',
  aggFunc: 'sum',
  // below formatter from: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  cellRenderer: ({ value }) => `£ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
};
/*END OF INDIVIDUAL COLUMNS */

const COLUMN_DEFINITIONS = {
  NOTHING_SELECTED: [],
  CONTINENT_SELECTED: [
    COUNTRY, COUNTRY_HIDDEN,
    YEAR, YEAR_HIDDEN,
    MONTH, MONTH_HIDDEN,
    SALES
  ],
  COUNTRY_SELECTED: [
    CITY, CITY_HIDDEN,
    YEAR, YEAR_HIDDEN,
    MONTH, MONTH_HIDDEN,
    SALES
  ],
  CITY_SELECTED: [
    YEAR, YEAR_HIDDEN,
    MONTH, MONTH_HIDDEN,
    SALES
  ]
};

export {
  NO_SELECTION,
  CONTINENTS,
  CONTINENTS_WITH_COUNTRIES,
  COUNTRIES_WITH_CITIES,
  COLUMN_DEFINITIONS
};
