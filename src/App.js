import './App.css';
import { useState, useEffect } from 'react';
import CardBox from './components/Card/Card';
import Navbar from './components/navbar/Navbar';
// import Chart from './components/Chart/Chart';
import Select from 'react-select'


function App() {
  // const [chartData, setChartData] = useState({
  //   labels: ['Loading'],
  //   datasets: [
  //     {
  //       label: "deaths",
  //       data: ['Loading'],
  //       backgroundColor: [
  //         "#ffbb11",
  //         "#ecf0f1",
  //         "#50AF85",
  //         "#f3ba2f",
  //         "#2a71d0"
  //       ]
  //     }
  //   ]
  // });
  const [countriesData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  let [selCountryObj, setSelCountryObj] = useState("");

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

  }, [])

  // displaying all countries into react-select
  countries.forEach((name) => {
    options.push({
      value: name, label: name,
    })
  })


  // getting value of react-select
  const getCountry = (obj) => {

    setSelectedCountry(obj.value);

    // finding the selected Country obj from countries data by using map
    countriesData.map((countryObj, index) => {
      if (obj.value === countryObj.country) {
        setSelCountryObj(countriesData[index]);
      }
      return 1;
    })

  }

  return (
    <div>
      <Navbar />
      <div className='CardWrapper'>
        <CardBox TitleType={'Total Cases'} CaseDetails={selCountryObj.cases.total} />
        <CardBox TitleType={'Total Recovered'} CaseDetails={selCountryObj.cases.recovered} />
        <CardBox TitleType={'Total Deaths'} CaseDetails={selCountryObj.deaths.total} />
      </div>

      <div className='queryWrapper'>
        <Select options={options} value={{ label: selectedCountry }} onChange={getCountry} className='select' />
      </div>

      {/* <Chart chartData={chartData} /> */}
    </div>
  );
}

export default App;
