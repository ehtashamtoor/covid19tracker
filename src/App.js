import './App.css';
import { useState, useLayoutEffect } from 'react';
import CardBox from './components/Card/Card';
import Navbar from './components/navbar/Navbar';
// import Chart from './components/Chart/Chart';
import Select from 'react-select'

import { Button } from '@mui/material';



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

  const options = []


  useLayoutEffect(() => {
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
    console.log(countries);
    console.log(countriesData);

  }, [])


  countries.forEach((name) => {
    options.push({
      value: name, label: name,
    })
  })





  return (
    <div>
      <Navbar />
      <div className='CardWrapper'>
        <CardBox />
        <CardBox />
        <CardBox />
      </div>

      <div className='queryWrapper'>
        <Select options={options} className='select'/>
        <Button variant="contained" className='findBtn'>Find</Button>
      </div>

      {/* <Chart chartData={chartData} /> */}
    </div>
  );
}

export default App;







// const getPrices = async () => {
//   const prices_result = await fetch("https://api.coincap.io/v2/assets/?limit=5")

//   let data = await prices_result.json();

//   var labelData = data.data.map(crypto => crypto.name)
//   var pricesData = data.data.map(crypto => crypto.priceUsd)

//   setChartData({
//     labels: labelData,
//     datasets: [
//       {
//         label: "Price in USD",
//         data: pricesData,
//         backgroundColor: [
//           "#ffbb11",
//           "#ecf0f1",
//           "#50AF85",
//           "#f3ba2f",
//           "#2a71d0"
//         ]
//       }
//     ]
//   })
// }
// getPrices()
