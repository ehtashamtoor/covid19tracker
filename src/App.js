import './App.css';
import { useState, useEffect } from 'react';
import CardBox from './components/Card/Card';
import Navbar from './components/navbar/Navbar';
import Chart from './components/Chart/Chart';
import Select from 'react-select'


function App() {
  const [chartData, setChartData] = useState({
    labels: ['Loading'],
    datasets: [
      {
        label: "deaths",
        data: ['Loading'],
        backgroundColor: [
          "#ffbb11",
          "#ecf0f1",
          "#50AF85",
          "#f3ba2f",
          "#2a71d0"
        ]
      }
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
        console.log(selCountryObj.cases.total)
        return 1;
      }
    })
    // setting values of total, recoevered and death cases
      setTotalCases(selCountryObj.cases.total)
      setRecovered(selCountryObj.cases.recovered)
      setDeaths(selCountryObj.deaths.total)
  }

  return (
    <div>
      <Navbar />
      <div className='CardWrapper'>

        <CardBox TitleType={'Total Cases'} CaseDetails={totalCases || 638610555} />
        <CardBox TitleType={'Total Recovered'} CaseDetails={recovered || 618385160} />
        <CardBox TitleType={'Total Deaths'} CaseDetails={deaths || 6608627} />
      </div>

      <div className='queryWrapper'>
        <Select options={options} value={{ label: selectedCountry }} onChange={getCountry} className='select' placeholder={<div>Type to search</div>} />
      </div>

      <Chart chartData={chartData} />
    </div>
  );
}

export default App;
