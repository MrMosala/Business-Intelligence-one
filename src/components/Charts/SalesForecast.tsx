import React from 'react';
import { Line } from 'react-chartjs-2';  

export interface SalesForecastProps {
  forecast: { Date: string; Forecast: number }[];
}


export const SalesForecast: React.FC<SalesForecastProps> = ({ forecast }) => {
  const data = {
    labels: forecast.map((f) => f.Date),
    datasets: [
      {
        label: 'Sales Forecast',
        data: forecast.map((f) => f.Forecast),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Forecasted Sales' } },
    },
  };

  return <Line data={data} options={options} />;
};
