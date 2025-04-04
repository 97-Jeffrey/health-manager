import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatDateToMonthDayYear } from '../../lib/util/date';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
  } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend

);

interface BarChartInterface {
    text: string,
    labels: string[],
    values: number [],
    selectTargetData: (date: string)=> void
    handleOpen?:()=> void,
}



const BarChart: React.FC<BarChartInterface> = ({ text, labels, values, selectTargetData, handleOpen  }) => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: `${text}`,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          barThickness: 40
        },
      ],
    };
  
    const options: ChartOptions<'bar'> = {
      responsive: true,
      onClick: (_, elements) => {
        const targetDate = labels[elements[0]?.index];
        selectTargetData(targetDate)
        if(handleOpen) handleOpen()

      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: text,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: 'rgba(0, 0, 0, 0.8)', // Customize tick color
            callback: function(value) {
              // Convert the label (e.g., "2024-01-01") to a formatted date
              const date = new Date(this.getLabelForValue(value as number))
              return formatDateToMonthDayYear(date);
            }
          }
        },
        y: {
          grid: {
            display: false, // Remove horizontal grid lines
            // drawBorder: false, // Optional: remove y-axis line
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.8)', // Customize tick color
          }
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  
  export default BarChart;

