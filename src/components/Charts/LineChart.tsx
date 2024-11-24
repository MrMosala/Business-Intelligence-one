// components/Charts/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    labels: string[];
    data: number[];
    title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ labels, data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: title },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        labels,
        data,
        backgroundColor: '#ff5722',
      },
    ],
  };

  return <Line  options={options} data={chartData}  />;
};