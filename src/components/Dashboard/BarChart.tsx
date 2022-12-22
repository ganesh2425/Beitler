import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts';
import PieChart from "highcharts-react-official";
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);

type IProps = {
    left: boolean
}

const BarChart = ( {left} : IProps): JSX.Element => {
    const [chartData, setChartData]  = useState({});
    const [doughnutData, setDoughnutData]  = useState({});
    // const [employeeSalary, setEmployeeSalary] = useState([]);
    // const [employeeAge, setEmployeeAge] = useState([]);
    const Chart = () => {
        setChartData({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Average fruit consumption during one week'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: 'Fruit units'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'John',
                data: [3, 4, 3, 5, 4, 10, 12]
            }, {
                name: 'Jane',
                data: [1, 3, 4, 3, 3, 5, 4]
            }]
        });
    }

    const ChartData = () => {
        setDoughnutData({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                },
                styledMode: true
            },
            title: {
                text: ''
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }]
        });
    }
    useEffect(() => {
        Chart();
        ChartData();
    }, []);

    return(
        <div className="App align-items-center justify-content-center d-flex">
            <div>
                {
                    left ?
                        <PieChart
                            highcharts={Highcharts}
                            options={doughnutData}
                        /> :
                        <PieChart
                            highcharts={Highcharts}
                            options={chartData}
                        />
                }
            </div>
        </div>
    )
}
export default BarChart;