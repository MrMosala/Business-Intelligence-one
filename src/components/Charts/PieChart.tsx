import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generateColors } from '@/utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({ labels, data, title }) => {
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
        labels,
        data,
        backgroundColor: generateColors(data.length),
      },
    ],
  };

  return <Pie options={options} data={chartData} />;
};