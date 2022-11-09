import React from "react";
// import './chart.css'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const Chartt = ({ chartData }) => {
    return (
            <Chart
                type='bar'
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Country"
                        },
                        legend: {
                            display: true,
                            position: "top",
                        },
                    }
                }}
            />
    )
}

export default Chartt;
