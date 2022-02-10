const CONTINENTS = ['Africa', 'Asia', 'Europe'];
const COUNTRIES = ['country 1', 'country 2', 'country 3'];
const REGIONS = ['region 1', 'region 2', 'region 3'];
const SECTIONS = ['section 1', 'section 2', 'section 3'];
const YEARS = ['2019', '2020'];
const MONTHS = [...Array(12)].map((_, month) => month);

const matchesContinent = (continent) => (record) => record.continent === continent;
const matchesCountry = (country) => (record) => record.country === country;
const matchesRegion = (region) => (record) => record.region === region;
const matchesSection = (section) => (record) => record.section === section;
const combineMatches = (...toCombine) => (record) => {
  for (const rule of toCombine) {
    if (!rule(record)) {
      return false;
    }
  }
  return true;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataFactory = () => {
  let data = [];
  CONTINENTS.forEach(continent => {
    COUNTRIES.forEach(country => {
      REGIONS.forEach(region => {
        SECTIONS.forEach(section => {
          YEARS.forEach(year => {
            MONTHS.forEach(month => {
              for (let i = 0; i <= 100; i++) {
                data.push({
                  continent, country, region, section, year, month, sales: getRandomInt(1, 1000)
                })
              }
            })
          })
        })
      })
    })
  })
  return data;
}

function calculateSales(data, condition ) {
  return data.reduce((current, record) => condition (record) ? current + record.sales : current, 0);
}

const convertToTree = (data) => {
  return CONTINENTS.map(continent => {

    return ({
      continent,
      allRecords: data.filter(combineMatches(matchesContinent(continent))),
      sales: calculateSales(data, combineMatches(matchesContinent(continent))),
      countries: COUNTRIES.map(country => ({
        country,
        allRecords: data.filter(combineMatches(matchesContinent(continent), matchesCountry(country))),
        sales: calculateSales(data, combineMatches(matchesContinent(continent), matchesCountry(country))),
        regions: REGIONS.map(region => ({
          region,
          allRecords: data.filter(combineMatches(matchesContinent(continent), matchesCountry(country), matchesRegion(region))),
          sales: calculateSales(data, combineMatches(matchesContinent(continent), matchesCountry(country), matchesRegion(region))),
          sections: SECTIONS.map(section => ({
            section,
            allRecords: data.filter(combineMatches(matchesContinent(continent), matchesCountry(country), matchesRegion(region), matchesSection(section))),
            sales: calculateSales(data, combineMatches(matchesContinent(continent), matchesCountry(country), matchesRegion(region), matchesSection(section))),
          }))
        }))
      }))
    });
  })
}

const RAW_DATA= dataFactory();
const MOCK_ROW_DATA = convertToTree(RAW_DATA);
export default MOCK_ROW_DATA;