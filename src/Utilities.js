export const ALL_SELECTION = 'All';
export const NO_SELECTION = 'No Selection';
export const CONTINENT_VALUES = ['Europe', 'Asia'];

/* INDIVIDUAL COLUMNS */
const CONTINENT = {
  field: 'continent', rowGroup: true, hide: true
};
const COUNTRY = {
  field: 'country', rowGroup: true, hide: true
};
const REGION = {
  field: 'region', rowGroup: true, hide: true
};
const SECTION = { field: 'section' };
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

export const COLUMN_DEFINITIONS = {
  NOTHING_SELECTED: [],
  ALL_CONTINENTS_SELECTED: [
    CONTINENT, YEAR, MONTH, SALES
  ],
  ONE_CONTINENT_SELECTED: [
    COUNTRY, YEAR, MONTH, SALES
  ],
  COUNTRY_SELECTED: [
    REGION, YEAR, MONTH, SALES
  ],
  REGION_SELECTED: [
    SECTION, YEAR, MONTH, SALES
  ]
};

