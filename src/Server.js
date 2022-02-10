import MOCK_ROW_DATA from "./MockData";
import {ALL_SELECTION} from "./Utilities";

function getRowData(continent, country, region) {
  let result;
  let selectedCountry;
  let actualContinent;

  debugger;
  if (continent === ALL_SELECTION && !country) {
    result = MOCK_ROW_DATA.map(it => ({continent: it.continent, sales: it.sales}))
  } else if (continent && !country) {
    result = MOCK_ROW_DATA.filter(row => row.continent === continent)[0].countries.map(it =>
        ({
          continent,
          country: it.country,
          sales: it.sales,
          allRecords: it.allRecords
        }))
  } else if (continent === ALL_SELECTION && country) {
    MOCK_ROW_DATA.forEach(it => {
      it.countries.forEach(c => {
        if (c.country === country) {
          actualContinent = it.continent
          console.log(it.continent)
          selectedCountry = c
        }
      })
    })
    result = selectedCountry.regions.map(r => ({continent: actualContinent, country, region: r.region, sales: r.sales}))
  } else if (continent && country) {
    actualContinent = continent;
    const selectedContinent = MOCK_ROW_DATA.filter(it => it.continent === continent)[0]
    selectedCountry = selectedContinent.countries.filter(c => c.country === country)[0]
    result = selectedCountry.regions.map(r => ({continent, country, region: r.region, sales: r.sales, allRecords: r.allRecords}))
  }
  if (region) {
    const selectedRegion = selectedCountry.regions.filter(r => r.region === region)[0]
    result = selectedRegion.sections.map(s => ({...s, continent: actualContinent, country, region}))
  }
  return result;
}


export function mockServerRowDataRequest(request) {
  const {continent, country, region} = request
  return new Promise(resolve => {
    setTimeout(() => {
      let rowDataUnexploded = getRowData(continent, country, region);
      debugger;
      let exploded = [];
      rowDataUnexploded.forEach(container=>{
        exploded = [...exploded, ...container.allRecords];
      })
      resolve(exploded)
    }, 500)
  })
}

export function getRegionsByCountry(continent, country) {
  return new Promise(resolve => {
    let result;
    if (continent === ALL_SELECTION) {
      MOCK_ROW_DATA.forEach(it => {
        it.countries.forEach(c => {
          if (c.country === country) {
            result = c.regions.map(r => r.region)
          }
        })
      })
    } else {
      MOCK_ROW_DATA.forEach(it => {
        if (it.continent === continent) {
          it.countries.forEach(c => {
            if (c.country === country) {
              result = c.regions.map(r => r.region)
            }
          })
        }
      })
    }
    setTimeout(() => {
      resolve(result)
    }, 500)
  })
}

export function getCountriesByContinent(continent) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (continent === ALL_SELECTION) {
        resolve(MOCK_ROW_DATA.map(it => it.countries.map(c => c.country)).flat())
      } else {
        MOCK_ROW_DATA.forEach(it => {
          if (it.continent === continent) {
            resolve(it.countries.map(c => c.country))
          }
        })
      }
    }, 500)
  })
}

