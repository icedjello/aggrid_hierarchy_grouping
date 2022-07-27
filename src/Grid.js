import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { NO_SELECTION, CONTINENTS, COLUMN_DEFINITIONS } from "./Utilities";
import { mockServerRowDataRequest, getCountriesByContinent, getCitiesByCountry } from "./Server";
import Card from "./Card";

function Grid() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [inputOptions, setInputOptions] = useState({
    continents: CONTINENTS, countries: undefined, cities: undefined
  });
  const [selectedOptions, setSelectedOptions] = useState({
    continent: NO_SELECTION, country: undefined, city: undefined
  });
  const [columnDefs, setColumnDefs] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    if (!gridRef.current.api) { // to initialise
      setColumnDefs(COLUMN_DEFINITIONS.NOTHING_SELECTED);
    }
    setShowGrid(false);

    mockServerRowDataRequest(selectedOptions).then((data) => {
      setShowGrid(true);
      setRowData(data);
    });
  }, [selectedOptions]);

  const makeOptions = (options, nameForNoSelection) => {
    const resultOptions = options == null ? [] : options.map(option => <option key={option}>{option}</option>);
    resultOptions.unshift(
      <option
        key={`${NO_SELECTION}-${nameForNoSelection}`}
        value={NO_SELECTION}
      >No Selection</option>);
    return resultOptions;
  }

  const onContinentChanged = useCallback(
    (newContinent) => {
      if (newContinent === NO_SELECTION) {
        setRowData([]);
        setColumnDefs(COLUMN_DEFINITIONS.NOTHING_SELECTED);
        setSelectedOptions({ continent: newContinent, country: undefined, city: undefined });
      } else {
        if (newContinent !== selectedOptions.continent && selectedOptions.continent !== NO_SELECTION) {
          // If a continent is selected already and another is selected.
          // Example: selecting Europe after Asia.
          getCountriesByContinent(newContinent).then((countries) => {
            setInputOptions({ continents: CONTINENTS, countries, cities: [] });
            setColumnDefs(COLUMN_DEFINITIONS.CONTINENT_SELECTED);
            setSelectedOptions({ continent: newContinent, countries: [], cities: [] });
          })
        } else {
          // Selecting a continent when no prior continent was selected.
          getCountriesByContinent(newContinent).then((countries) => {
            setInputOptions({ continents: CONTINENTS, countries, cities: [] });
            setColumnDefs(COLUMN_DEFINITIONS.CONTINENT_SELECTED);
            setSelectedOptions({ ...selectedOptions, continent: newContinent });
          })
        }
      }
    }, [selectedOptions]
  )

  const onCountryChanged = useCallback(
    newCountry => {
      getCitiesByCountry(newCountry).then((cities) => {
        setInputOptions({ ...inputOptions, cities });
        setColumnDefs(COLUMN_DEFINITIONS.COUNTRY_SELECTED);
        setSelectedOptions({ ...selectedOptions, country: newCountry });
      })
    }, [selectedOptions, inputOptions]
  )

  const onCityChanged = useCallback(
    newCity => {
      setColumnDefs(COLUMN_DEFINITIONS.CITY_SELECTED);
      setSelectedOptions({ ...selectedOptions, city: newCity });
    }
    , [selectedOptions]
  )

  const makeContinentSelector = useCallback(() => {
    return (<div className="selector">
      <label>Continent:</label>
      <select
        defaultValue={NO_SELECTION}
        onChange={e => onContinentChanged(e.target.value)}
      >{makeOptions(inputOptions.continents, 'continent')}</select>
    </div>)

  }, [onContinentChanged, inputOptions.continents])

  const makeCountrySelector = useCallback(() => {
    return (<div className="selector">
      <label
      >Country:</label>
      <select
        defaultValue={NO_SELECTION}
        onChange={e => onCountryChanged(e.target.value)}
      >{makeOptions(inputOptions.countries, 'country')}</select>
    </div>

    )
  }, [onCountryChanged, inputOptions.countries])

  const makeCitySelector = useCallback(() => {
    return (<div className="selector">
      <label
      >City:</label>
      <select
        defaultValue={NO_SELECTION}
        onChange={e => onCityChanged(e.target.value)}
      >{makeOptions(inputOptions.cities, 'city')}</select>
    </div>)
  }, [onCityChanged, inputOptions.cities])

  return (
    <>
      <Card>
        <Card className={'for-options'}>
          {makeContinentSelector()}
          {makeCountrySelector()}
          {makeCitySelector()}
        </Card>

        {showGrid &&
          <div
            className="ag-theme-alpine-dark"
            style={{
              height: '675px',
              margin: '20px',
              flexGrow: 1,
            }}
          >
            <AgGridReact
              rowGroupPanelShow={'always'}
              groupDisplayType={'custom'}
              suppressAggFuncInHeader
              groupDefaultExpanded={1}
              ref={gridRef}
              rowData={rowData}
              defaultColDef={{ flex: 1 }}
              columnDefs={columnDefs}
            />
          </div>
        }
      </Card>
    </>

  );
}

export default Grid;
