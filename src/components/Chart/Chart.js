import React from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const Chartt = ({ chartData }) => {
    return (
        <div style={{ height: "300px", width: "600px", margin:'auto' }}>
            <Chart
                type='bar'
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "CryptoCurrency Prices"
                        },
                        legend: {
                            display: true,
                            position: "top",
                        }
                    }
                }}
            />
        </div>
    )
}

export default Chartt;
