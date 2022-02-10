export const ALL_SELECTION = 'All';
export const NO_SELECTION = 'No Selection';

// const CONTINENT_VALUES = ['All', 'Europe', 'Asia', 'Africa', 'North America', 'South America'];
export const CONTINENT_VALUES = ['Europe', 'Asia'];
const MONTH_COLUMN = {
  field: 'month',
  rowGroup: true,
  hide: true,
}
const YEAR_COLUMN = {
  field: 'year',
  rowGroup: true,
  hide: true,
}
export const COLUMN_DEFINITIONS = {
  NOTHING_SELECTED: [],
  ALL_CONTINENTS_SELECTED: [
    {field: 'continent', rowGroup: true, hide: true},
    YEAR_COLUMN, MONTH_COLUMN,
    {field: 'sales', aggFunc: 'sum'}
  ],
  ONE_CONTINENT_SELECTED: [
    {field: 'continent', rowGroup: true, hide: true},
    {field: 'country', rowGroup: true, hide: true},
    YEAR_COLUMN, MONTH_COLUMN,
    {field: 'sales', aggFunc: 'sum'}
  ],
  COUNTRY_SELECTED: [
    {field: 'continent', rowGroup: true, hide: true},
    {field: 'country', rowGroup: true, hide: true},
    {field: 'region', rowGroup: true, hide: true},
    YEAR_COLUMN, MONTH_COLUMN,
    {field: 'sales', aggFunc: 'sum'}
  ],
  REGION_SELECTED: [
    {field: 'continent', rowGroup: true, hide: true},
    {field: 'country', rowGroup: true, hide: true},
    {field: 'region', rowGroup: true, hide: true},
    {field: 'section'},
    YEAR_COLUMN, MONTH_COLUMN,
    {field: 'sales', aggFunc: 'sum'}
  ]
}