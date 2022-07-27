// const START_STRUCTURE = {
//   'Europe': {
//     'France': {
//       'Paris': {},
//       'Marseille': {},
//       'Lyon': {},
//       'Tolouse': {}
//     },
//     'Germany': {
//       'Berlin': {},
//       'Hamburg': {},
//       'Munich': {},
//       'Cologne': {}
//     },
//     'Italy': {
//       'Rome': {},
//       'Milan': {},
//       'Naples': {},
//       'Turin': {},
//     },
//     'Spain': {
//       'Madrid': {},
//       'Barcelona': {},
//       'Valencia': {},
//       'Seville': {}

//     },
//     'UK': {
//       'London': {},
//       'Cardiff': {},
//       'Edinburgh': {},
//       'Belfast': {}
//     }
//   },
//   'Asia': {
//     'China': {
//       'Shanghai': {},
//       'Beijing': {},
//       'Chongqing': {},
//       'Tianjin': {}
//     },
//     'India': {
//       'Mumbai': {},
//       'Delhi': {},
//       'Bangalore': {},
//       'Hyderabad': {}
//     },
//     'Iran': {
//       'Tehran': {},
//       'Mashhad': {},
//       'Isfahan': {},
//       'Shiraz': {}
//     },
//     'Japan': {
//       'Tokyo': {},
//       'Yokohama': {},
//       'Osaka': {},
//       'Nagoya': {}
//     },
//     'Turkey': {
//       'Istanbul': {},
//       'Ankara': {},
//       'Izmir': {},
//       'Bursa': {}
//     }
//   },
// };

const START_STRUCTURE = {
  'Europe': {
    'France': {
      'Paris': [],
      'Marseille': [],
      'Lyon': [],
      'Tolouse': []
    },
    'Germany': {
      'Berlin': [],
      'Hamburg': [],
      'Munich': [],
      'Cologne': []
    },
    'Italy': {
      'Rome': [],
      'Milan': [],
      'Naples': [],
      'Turin': [],
    },
    'Spain': {
      'Madrid': [],
      'Barcelona': [],
      'Valencia': [],
      'Seville': []

    },
    'UK': {
      'London': [],
      'Cardiff': [],
      'Edinburgh': [],
      'Belfast': []
    }
  },
  'Asia': {
    'China': {
      'Shanghai': [],
      'Beijing': [],
      'Chongqing': [],
      'Tianjin': []
    },
    'India': {
      'Mumbai': [],
      'Delhi': [],
      'Bangalore': [],
      'Hyderabad': []
    },
    'Iran': {
      'Tehran': [],
      'Mashhad': [],
      'Isfahan': [],
      'Shiraz': []
    },
    'Japan': {
      'Tokyo': [],
      'Yokohama': [],
      'Osaka': [],
      'Nagoya': []
    },
    'Turkey': {
      'Istanbul': [],
      'Ankara': [],
      'Izmir': [],
      'Bursa': []
    }
  },
};
const YEARS = [2019, 2020, 2021];

const MONTHS = [...new Array(12)].map((_, month) => month);

const makeSalesNumber = (min = 100, max = 1000) => Math.round(Math.random() * (max - min) + min) * 1000;

const MOCK_DATA = (function (startStructure = START_STRUCTURE, years = YEARS, months = MONTHS) {
  const result = [];
  Object.entries(startStructure).forEach(([continent, countries]) => {
    Object.entries(countries).forEach(([country, cities]) => {
      Object.entries(cities).forEach(([city]) => {
        years.forEach(year => {
          months.forEach(month => {
            result.push(
              {
                continent,
                country,
                city,
                year,
                month,
                sales: makeSalesNumber()
              }
            )
          })
        })
      })
    })
  })
  return result;
})();

export {
  START_STRUCTURE, MOCK_DATA
};
