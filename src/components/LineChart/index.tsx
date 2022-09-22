import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns'

Chart.register(...registerables);

const LineChart = ({price, time, display, borderColor, borderWidth, events  }: any) => {
    const data= {
        labels: Array.isArray(price[0]) ? 
         price.map((item: number[]) => format(item[0], 'p')) :
         price.map((item: number[]) => item),
        datasets: [{
            label: '',
            data: Array.isArray(price[0]) ? 
            price.map((item: number[]) => item[1]) :
            price.map((item: number[]) => item),
            lineTension: 0.5,
            borderColor,
            borderWidth,
        }],
    }

    return (<Line data={data} options={{
        responsive: true,
        maintainAspectRatio: true,
        events,
        hover: {
            intersect: false,
          },
        plugins: {
            legend: {
                display: false,
            }, 
            
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            },
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                display,
                ticks: {
                    maxTicksLimit: 12,
                    maxRotation: 0,                    
                    padding: 10,

                },
                grid: {
                    display: false,
                    drawOnChartArea: true
                }
            },
            y: {
                display,
                ticks: {
                    maxTicksLimit: 6,
                    autoSkip: false,
                    maxRotation: 0,
                    padding: 10,
                    
                },
                grid: {
                    color: 'gray',
                    borderDash: [8, 4],
                }
            }
        }
    }}/>);
};

export default LineChart;