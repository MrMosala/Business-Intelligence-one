// components/Charts/ScatterChart.tsx
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ScatterChartProps { 
  data: {x:Number,y:Number}[];
  title: string;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({   data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: title },
    },
    scales: {
      x: { title: { display: true, text: 'Price' } },
      y: { title: { display: true, text: 'Ordered' } },
    },
  };

  const chartData = { 
    datasets: [
      {
        label: title, 
        data,
        backgroundColor: '#ff5722',
        
      },
    ],
  }; 
  return <Scatter options={options} data={chartData} />;
};