import React, { useRef } from 'react';
import { PieChart } from '../Charts/PieChart';
import { DoughnutChart } from '../Charts/DoughnutChart';
import { ScatterChart } from '../Charts/ScatterChart';
import { LineChart } from '../Charts/LineChart'; 
import { ChartContainer } from './ChartContainer';
import { exportToCSV, exportToImage } from '@/utils/exports';
import BarChart from '../Charts/BarChart';
import { DashboardData } from '@/types/datatypes';


interface DashboardProps {
    data: DashboardData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {

    return (
        <>
            {data.salesData &&
                <>
                    <div className="grid w-full grid-cols-1 gap-4 mb-4 xl:grid-cols-12">
                        <ChartContainer title="Product line performance" col="xl:col-span-8"  >
                            <BarChart
                                labels={data.salesData.map(item => item.PRODUCTLINE)}
                                data={data.salesData.map(item => item.SALES)}
                                title="Sales"
                                colorful={true}
                                xlabel='Product Line'
                                ylabel='Sales'
                            />
                        </ChartContainer>
                        <ChartContainer title="Order Status Distribution" col="xl:col-span-4">
                            <PieChart
                                labels={data.orderStatus.map(item => item.STATUS)}
                                data={data.orderStatus.map(item => item.count)}
                                title="Orders by Status"
                            />
                        </ChartContainer>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-4 mb-4 xl:grid-cols-12">
                        <ChartContainer title="Quantity vs Price" col="xl:col-span-6">
                            <ScatterChart
                                data={data.quantityVsPrice.map(item => ({
                                    x: item.PRICEEACH,
                                    y: item.QUANTITYORDERED
                                }))}
                                title="Quantity vs Price"
                            />
                        </ChartContainer>
                        <ChartContainer title="Sales Over Time" col="xl:col-span-6">
                            <LineChart
                                labels={data.salesOverTime.map(item => item.ORDERDATE)}
                                data={data.salesOverTime.map(item => item.SALES)}
                                title="Sales Over Time"
                            />
                        </ChartContainer>
                    </div>
                </>
            }
            {data.itemFrequency &&
                <>
                    <div className="grid w-full grid-cols-1 gap-4 mb-4 xl:grid-cols-12">

                        <ChartContainer title="Top 10 Items by Frequency" col="xl:col-span-8">
                            <BarChart
                                labels={Object.keys(data.itemFrequency)}
                                data={Object.values(data.itemFrequency)}
                                title="Items"
                                colorful={true}
                                xlabel='Grocery item'
                                ylabel='Number items sold'
                            />
                        </ChartContainer>
                        <ChartContainer title="Customer Purchase Frequency" col="xl:col-span-4">
                            <PieChart
                                labels={Object.keys(data.customerFrequency)}
                                data={Object.values(data.customerFrequency)}
                                title="Distribution of customer purchase frequency."
                            />
                        </ChartContainer>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-4 mb-4 xl:grid-cols-12">
                        <ChartContainer title="Monthly Sales Trend" col="xl:col-span-8">
                            <LineChart
                                labels={data.monthlySales.map(item => item.Date)}
                                data={data.monthlySales.map(item => item.count)}
                                title="Sales trends over time"
                            />
                        </ChartContainer>
                        <ChartContainer title="Customer Segmentation" col="xl:col-span-4"  >
                            <DoughnutChart
                                labels={Object.keys(data.customerSegments)}
                                data={Object.values(data.customerSegments)}
                                title="Distribution of customers across segments"
                                colorful={true}
                            />
                        </ChartContainer>
                    </div>
                </>
            }
        </>

    );
};