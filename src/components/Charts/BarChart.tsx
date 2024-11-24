import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { generateColors } from '@/utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    xlabel: string | undefined;
    ylabel: string | undefined;
    labels: string[];
    data: number[];
    title: string;
    colorful: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ xlabel, ylabel, labels, data, title, colorful }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                backgroundColor: colorful ? generateColors(labels.length) : '#ff5722',
            },
        ],
    };

    const options: ChartOptions<'bar'> = { 
        responsive: true,
        plugins: { 
            title: {
                display: false,
                text: title,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xlabel,
                },
            },
            y: {
                title: {
                    display: true,
                    text: ylabel,
                },
            },
        },
    };

    return <Bar options={options} data={chartData} />;
};

export default BarChart;
