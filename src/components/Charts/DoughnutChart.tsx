import React from 'react';
import {  Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,  Title, Tooltip, Legend } from 'chart.js'; 
import { generateColors } from '../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale,  Title, Tooltip, Legend);

interface DoughnutChartProps {
    labels: string[];
    data: number[];
    title: string;
    colorful: boolean;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, data, title, colorful = false }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                labels,
                data,
                backgroundColor: colorful ? generateColors(labels.length) : '#ff5722',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: title },
        },
    };

    return <Doughnut options={options} data={chartData} />;
};