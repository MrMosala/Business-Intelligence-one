// components/SalesPrediction.tsx
import React from 'react';
import { Scatter } from 'react-chartjs-2';

interface SalesPredictionProps {
  predictions: { Actual: number; Predicted: number }[];
}

export const SalesPrediction: React.FC<SalesPredictionProps> = ({ predictions }) => {
  const data = {
    datasets: [
      {
        label: 'Actual vs Predicted Sales',
        data: predictions.map((p) => ({ x: p.Actual, y: p.Predicted })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Actual Sales' } },
      y: { title: { display: true, text: 'Predicted Sales' } },
    },
  };

  return <Scatter data={data} options={options} />;
};
 
