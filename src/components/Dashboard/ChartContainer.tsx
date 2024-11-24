// src/components/Dashboard/ChartContainer.tsx

import { exportToImage } from '@/utils/exports';
import React, { ReactNode, useRef } from 'react';

interface ChartContainerProps {
    title: string;
    children: ReactNode;
    col: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, children, col }) => {
    const chartRef = useRef(null)
    return (
        <div ref={chartRef} className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm ${col} dark:border-gray-700 sm:p-6 dark:bg-gray-800`}>
            <div className='flex justify-between'>
                <h2 className="text-xxl font-semibold mb-4 dark:text-white">{title}</h2>
                <button onClick={() => exportToImage(chartRef, title)} className='rounded-lg text-white bg-primary-500 p-2'>Export</button> 
            </div> 
            <div className="w-full flex flex-col">
                {children} 
            </div>
        </div>
    );
};