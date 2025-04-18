import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";

import { MicronutrientsInterface } from "../../types/recipe";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

interface MicronutrientBarChartInterface {
    name: string,
    micronutrients: MicronutrientsInterface
}

const MicronutrientBarChart: React.FC<MicronutrientBarChartInterface> = ({ name,  micronutrients }) => {
    // Extract labels, data and units
    const labels = Object.keys(micronutrients);
    const dataValues = labels.map(key => micronutrients[key][0]);
    const units = labels.map(key => micronutrients[key][1]);
  
    const data = {
      labels,
      datasets: [
        {
          label: "Micronutrients",
          data: dataValues,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          barThickness: 15, // 👈 sets fixed bar width (in pixels)
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
            display: false, 
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const index = context.dataIndex;
              const label = context.dataset.label || "";
              const value = context.raw;
              const unit = units[index];
              return `${label}: ${value} ${unit}`;
            },
          },
        },
        title: {
          display: true,
          text: `Micronutrient Breakdown for "${name}"`,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Quantity",
          },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Micronutrient",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 45,
          },
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  
  export default MicronutrientBarChart;
