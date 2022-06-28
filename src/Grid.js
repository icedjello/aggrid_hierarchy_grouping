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
    continents: undefined, countries: undefined, cities: undefined
  });
  const [selectedOptions, setSelectedOptions] = useState({
    continent: undefined, country: undefined, city: undefined
  });

  const setColumnDefs = useCallback((columnDefs) => {
    if (!gridRef.current) return;
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  // useEffect(() => {
  //   mockServerRowDataRequest(selectedOptions).then((data) => {
  //     setRowData(data);
  //   });
  // }, [selectedOptions]);

  const onGridReady = useCallback(() => {
    setColumnDefs(COLUMN_DEFINITIONS.NOTHING_SELECTED);
  }, [setColumnDefs]);


  // const labelStylesAndNames = {
  //   continent: { style: { marginRight: '5px', fontFamily: 'sans-serif' }, name: 'Continent' },
  //   country: { style: { marginRight: '18px', fontFamily: 'sans-serif' }, name: 'Country' },
  //   city: { style: { marginRight: '46px', fontFamily: 'sans-serif' }, name: 'City' },
  // };


  // useEffect(() => {
  //   setInputOptions({ continents: undefined, countries: undefined, cities: undefined })
  // }, [inputOptions]);


  function onContinentChanged(newContinent) {
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
    /*Ask if this is better than explicitly putting it in the IF/ELSE? */
    // setSelectedHierarchy({ continent: newContinent, country: undefined, city: undefined })
  }

  const onCountryChanged = newCountry => {
    getCitiesByCountry(newCountry).then((cities) => {
      setInputOptions({ ...inputOptions, cities });
      setColumnDefs(COLUMN_DEFINITIONS.COUNTRY_SELECTED);
      setSelectedOptions({ ...selectedOptions, country: newCountry });
    })
  }

  const onCityChanged = newCity => {
    setColumnDefs(COLUMN_DEFINITIONS.CITY_SELECTED);
    setSelectedOptions({ ...selectedOptions, city: newCity });
  }

  function makeOptions(optionsArray) {
    // sometimes optionsArray is undefined because options are async.
    // solve this.
    if (optionsArray == null) return;

    const results = optionsArray.map((op) => {
      return (<option key={op}>{op}</option>)
    })
    results.unshift(<option key={'no select'}>No Selection</option>)
    return results
  }

  function makeDropdownSelector(nameAndStyle, chosenValue, onChangeCB, optionsArray) {
    return (
      <div style={{ marginBottom: '5px' }}>
        <label style={nameAndStyle.style}>{nameAndStyle.name}</label>
        <select
          value={chosenValue}
          onChange={(e) => {
            onChangeCB(e.target.value)
          }}>
          {makeOptions()}
        </select>
      </div>
    );
  }

  // const makeOptionsPanel = () => {



  //   const makeDropDown = () => {
  //     const makeOptions = () => {

  //     }
  //     return (
  //       <div>
  //         BANG!
  //       </div>
  //     )
  //   }

  //   return (
  //     <div style={{ marginBottom: '5px' }}>
  //       {makeDropDown()}
  //     </div>
  //   );
  // }

  return (
    <div style={{ marginLeft: '20px', marginTop: '20px' }}>
      {/* {makeOptionsPanel()} */}
      <div style={{ marginBottom: '5px' }}>
        <label style={{ marginRight: '5px', fontFamily: 'sans-serif' }}>Continent</label>
        <select
          value={selectedOptions.continent}
          onChange={(e) => {
            onContinentChanged(e.target.value)
          }}>
          {makeOptions(undefined)}
        </select>
      </div>
      <div
        className="ag-theme-alpine-dark"
        style={{ width: '1200px', height: '675px' }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          autoGroupColumnDef={{ cellRendererParams: { suppressCount: true } }}
          rowGroupPanelShow={'always'}
          groupDisplayType={'multipleColumns'}
          suppressAggFuncInHeader={true}
          groupDefaultExpanded={0}
          ref={gridRef}
          rowData={rowData}
          defaultColDef={{ flex: 1 }}
        />
      </div>
    </div>);
}

export default Grid;
