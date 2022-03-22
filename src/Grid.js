import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { v4 as uuidv4 } from 'uuid';
import { ALL_SELECTION, NO_SELECTION, CONTINENT_VALUES, COLUMN_DEFINITIONS } from "./Utilities";
import { mockServerRowDataRequest, getCountriesByContinent, getRegionsByCountry } from "./Server";

function Grid() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(COLUMN_DEFINITIONS.NOTHING_SELECTED);
  const [inputOptions, setInputOptions] = useState({
    continents: CONTINENT_VALUES, countries: [], regions: []
  })
  const [selectedHierarchy, setSelectedHierarchy] = useState({
    continent: undefined, country: undefined, region: undefined
  })

  useEffect(() => {
    mockServerRowDataRequest(selectedHierarchy).then((data) => setRowData(data));
  }, [selectedHierarchy])

  function onContinentChanged(newContinent) {
    if (newContinent === NO_SELECTION) {
      setRowData([])
      setColumnDefs(COLUMN_DEFINITIONS.NOTHING_SELECTED)
    } else {
      getCountriesByContinent(newContinent).then((countries) => {
        setInputOptions({ continents: CONTINENT_VALUES, countries, regions: [] })
        newContinent === ALL_SELECTION ? setColumnDefs(COLUMN_DEFINITIONS.ALL_CONTINENTS_SELECTED) : setColumnDefs(COLUMN_DEFINITIONS.ONE_CONTINENT_SELECTED)
      })
    }
    setSelectedHierarchy({ continent: newContinent, country: undefined, region: undefined })
  }

  function onCountryChanged(newCountry) {
    getRegionsByCountry(selectedHierarchy.continent, newCountry).then((regions) => {
      setInputOptions({ ...inputOptions, regions })
      setSelectedHierarchy({ ...selectedHierarchy, country: newCountry, region: undefined })
      setColumnDefs(COLUMN_DEFINITIONS.COUNTRY_SELECTED)
    })
  }

  function onRegionChanged(newRegion) {
    setSelectedHierarchy({ ...selectedHierarchy, region: newRegion })
    setColumnDefs(COLUMN_DEFINITIONS.REGION_SELECTED)
  }

  function makeOptions(optionsArray) {
    const results = optionsArray.map((op) => {
      return (<option key={uuidv4()}>{op}</option>)
    })
    results.unshift(<option key={uuidv4()}>No Selection</option>)
    return results
  }

  return (<div
    style={{ marginLeft: '20px', marginTop: '20px' }}
  >
    <div style={{ marginBottom: '5px' }}>
      <div style={{ marginBottom: '5px' }}>
        <label style={{ marginRight: '5px', fontFamily: 'sans-serif' }}>Continent</label>
        <select
          value={selectedHierarchy.continent}
          onChange={(e) => {
            onContinentChanged(e.target.value)
          }}>
          {makeOptions(CONTINENT_VALUES)}
        </select>
      </div>
      <div style={{ marginBottom: '5px' }}>
        <label style={{ marginRight: '18px', fontFamily: 'sans-serif' }}>Country</label>
        <select
          value={selectedHierarchy.country}
          onChange={(e) => {
            onCountryChanged(e.target.value)
          }}>
          {makeOptions(inputOptions.countries)}
        </select>
      </div>

      <div>
        <label style={{ marginRight: '23px', fontFamily: 'sans-serif' }}>Region</label>
        <select
          value={selectedHierarchy.region}
          onChange={(e) => {
            onRegionChanged(e.target.value)
          }}>
          {makeOptions(inputOptions.regions)}
        </select>
      </div>


    </div>
    <div
      className="ag-theme-alpine-dark"
      style={{ width: '1200px', height: '675px' }}
    >
      <AgGridReact
        autoGroupColumnDef={{ cellRendererParams: { suppressCount: true } }}
        groupDisplayType={'multipleColumns'}
        suppressAggFuncInHeader={true}
        groupDefaultExpanded={0}
        ref={gridRef}
        rowData={rowData}
        defaultColDef={{ flex: 1 }}
        columnDefs={columnDefs}
      />
    </div>
  </div>);
}

export default Grid;

        // sideBar={{
        //   toolPanels: [{
        //     id: 'columns',
        //     labelDefault: 'Columns',
        //     labelKey: 'columns',
        //     iconKey: 'columns',
        //     toolPanel: 'agColumnsToolPanel',
        //     toolPanelParams: {
        //       suppressRowGroups: true,
        //       suppressValues: true,
        //       suppressPivots: true,
        //       suppressPivotMode: true,
        //       suppressColumnFilter: true,
        //       suppressColumnSelectAll: true,
        //       suppressColumnExpandAll: true,
        //     },
        //   },],
        //   defaultToolPanel: undefined
        // }}
