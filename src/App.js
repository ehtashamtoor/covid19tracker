import './App.css';
import { useState, useEffect } from 'react';
import CardBox from './components/Card/Card';
import Navbar from './components/navbar/Navbar';
import Chart from './components/Chart/Chart';

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';



function App() {
  const [chartData, setChartData] = useState({
    labels: ['Loading'],
    datasets: [
      {
        label: "Price in USD",
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


  useEffect(() => {
    const getPrices = async () => {
      const prices_result = await fetch("https://api.coincap.io/v2/assets/?limit=5")

      let data = await prices_result.json();

      var labelData = data.data.map(crypto => crypto.name)
      var pricesData = data.data.map(crypto => crypto.priceUsd)

      setChartData({
        labels: labelData,
        datasets: [
          {
            label: "Price in USD",
            data: pricesData,
            backgroundColor: [
              "#ffbb11",
              "#ecf0f1",
              "#50AF85",
              "#f3ba2f",
              "#2a71d0"
            ]
          }
        ]
      })
    }
    getPrices()
  }, [])
  return (
    <div>
      <Navbar />
      <div className='CardWrapper'>
        <CardBox />
        <CardBox />
        <CardBox />
      </div>

      <div className='queryWrapper'>
        <TextField label="Search Country" variant="outlined" sx={{width: 500, boxShadow: 1}}/>
        <Button variant="contained" className='findBtn'>Find</Button>
      </div>

      <Chart chartData={chartData} />
    </div>
  );
}

export default App;
