import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { NO_SELECTION, CONTINENTS, COLUMN_DEFINITIONS } from "./Utilities";
import { mockServerRowDataRequest, getCountriesByContinent, getCitiesByCountry } from "./Server";

function Grid() {

  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [inputOptions, setInputOptions] = useState({
    continents: CONTINENTS, countries: undefined, cities: undefined
  });
  const [selectedOptions, setSelectedOptions] = useState({
    continent: undefined, country: undefined, city: undefined
  });
  const [columnDefs, setColumnDefs] = useState([])

  useEffect(() => { // To initialise.
    setColumnDefs(COLUMN_DEFINITIONS.NOTHING_SELECTED);
  }, [])

  useEffect(() => {
    mockServerRowDataRequest(selectedOptions).then((data) => {
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
        getCountriesByContinent(newContinent).then((countries) => {
          setInputOptions({ continents: CONTINENTS, countries, cities: [] });
          setColumnDefs(COLUMN_DEFINITIONS.CONTINENT_SELECTED);
          setSelectedOptions({ ...selectedOptions, continent: newContinent });
        })
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


  const makeContinentSelector = useCallback(() => {
    return (<>
      <label
        style={{ marginRight: '5px', fontFamily: 'sans-serif' }}
      >Continent:</label>
      <select
        defaultValue={NO_SELECTION}
        onChange={e => onContinentChanged(e.target.value)}
      >{makeOptions(inputOptions.continents, 'continent')}</select>
    </>)

  }, [onContinentChanged, inputOptions.continents])

  const makeCountrySelector = useCallback(() => {
    return (<>
      <label
        style={{ marginRight: '18px', fontFamily: 'sans-serif' }}
      >Country:</label>
      <select
        defaultValue={NO_SELECTION}
        onChange={e => onCountryChanged(e.target.value)}
      >{makeOptions(inputOptions.countries, 'country')}</select>
    </>)
  }, [onCountryChanged, inputOptions.countries])

  return (
    <div style={{ marginLeft: '20px', marginTop: '20px' }}>
      {makeContinentSelector()}
      {makeCountrySelector()}
      <div
        className="ag-theme-alpine-dark"
        style={{ width: '1200px', height: '675px' }}
      >
        <AgGridReact
          rowGroupPanelShow={'always'}
          groupDisplayType={'multipleColumns'}
          suppressAggFuncInHeader={true}
          groupDefaultExpanded={1}
          ref={gridRef}
          rowData={rowData}
          defaultColDef={{ flex: 1 }}
          columnDefs={columnDefs}
          autoGroupColumnDef={{ cellRendererParams: { suppressCount: true } }}
        />
      </div>
    </div>);
}

export default Grid;
