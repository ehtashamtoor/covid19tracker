import './App.css';
import { useState, useEffect } from 'react';
import CardBox from './components/Card/Card';
import Navbar from './components/navbar/Navbar';
import Chart from './components/Chart/Chart';
import Select from 'react-select'


function App() {
  const [chartData, setChartData] = useState({
    labels: ['Case Details'],
    datasets: [
      {
        label: 'total',
        data: [638610555],
        backgroundColor: ["#fdbb12", "#25ff11", "#ff1129"]
      },
      {
        label: 'recovered',
        data: [618385160],
        backgroundColor: ["#25ff11"]
      },
      {
        label: 'deaths',
        data: [6608627],
        backgroundColor: ["#ff1129"]
      },
    ]
  });
  const [countriesData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  let [selectedCountry, setSelectedCountry] = useState('');
  let [selCountryObj, setSelCountryObj] = useState({});

  let [totalCases, setTotalCases] = useState(0);
  let [recovered, setRecovered] = useState(0);
  let [deaths, setDeaths] = useState(0);

  const options = []

  useEffect(() => {
    async function getData() {
      const axios = require("axios");

      const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
          'X-RapidAPI-Key': '6716fd4971msh5f1ad7b5ba87dd6p136f49jsnb152367a48eb',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      console.log("Loading data")

      await axios.request(options).then((response) => {

        response.data.response.map((countryObj) => {

          countriesData.push(countryObj)
          countries.push(countryObj.country)

          return 1;
        })

        setCountriesData([...countriesData]);
        setCountries([...countries])
        console.log("Data loaded up");

      }).catch((error) => {
        console.error(error);
      });
    }
    getData()

    // console.log(selCountryObj.cases.total)

  }, [])

  // displaying all countries into react-select
  countries.forEach((name) => {
    options.push({
      value: name, label: name,
    })
  })


  // getting value of react-select
  const getCountry = (obj) => {
    selectedCountry = obj.value;
    setSelectedCountry(selectedCountry);


    // finding the selected Country obj from countries data by using map
    countriesData.map((countryObj, index) => {
      if (selectedCountry === countryObj.country) {
        selCountryObj = countriesData[index];
        setSelCountryObj(selCountryObj);
        // console.log(selCountryObj.cases.total)
        return 1;
      }
    })
    // setting values of total, recoevered and death cases
    totalCases = selCountryObj.cases.total;
    totalCases = totalCases.toLocaleString()
    setTotalCases(totalCases)

    recovered = selCountryObj.cases.recovered;
    recovered = recovered.toLocaleString()
    setRecovered(recovered)

    deaths = selCountryObj.deaths.total;
    deaths = deaths.toLocaleString()
    setDeaths(deaths)

    // setting case details into the chartData
    setChartData({
      labels: ['Case Details'],
      datasets: [
        {
          label: 'total',
          data: [totalCases],
          backgroundColor: ["#fdbb12",]
        },
        {
          label: 'recovered',
          data: [recovered],
          backgroundColor: ["#25ff11"]
        },
        {
          label: 'deaths',
          data: [deaths],
          backgroundColor: ["#ff1129"]
        },
      ]
    })
  }

  return (
    <div  className='App'>
      <Navbar selectedCountry={selectedCountry}/>
      <div className='CardWrapper'>

        <CardBox TitleType={'Total Cases'} CaseDetails={totalCases || "638,610,555"} style="BgYellow"/>
        <CardBox TitleType={'Total Recovered'} CaseDetails={recovered || "618,385,160"} style="BgGreen"/>
        <CardBox TitleType={'Total Deaths'} CaseDetails={deaths || "6,608,627"} style="BgRed"/>
      </div>

      <div className='queryWrapper'>
        <Select options={options} value={{label: selectedCountry }} onChange={getCountry} className='select' placeholder={<div>Choose Country</div>}/>
      </div>

      <div className='chart'>
        <Chart chartData={chartData} />

      </div>
    </div>
  );
}

export default App;
