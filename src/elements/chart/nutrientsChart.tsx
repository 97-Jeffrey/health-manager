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
    micronutrients: MicronutrientsInterface,
    displayTitle: boolean,
    displayLegend: boolean,
    displayYGrid: boolean,
    displayXGrid: boolean,
    displayYTitle: boolean,
    displayXTitle: boolean,
    yBeginAtZero: boolean,
    xBeginAtZero: boolean,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    barThickness: number

}

const MicronutrientBarChart: React.FC<MicronutrientBarChartInterface> = ({ 
  name,  
  micronutrients,
  displayTitle,
  displayLegend,
  displayYGrid,
  displayXGrid,
  displayYTitle,
  displayXTitle,
  yBeginAtZero,
  xBeginAtZero,
  backgroundColor,
  borderColor,
  borderWidth,
  barThickness
}) => {
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
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          barThickness: barThickness
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
            display: displayLegend, 
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
          display: displayTitle,
          text: `Micronutrient Breakdown for "${name}"`,
        },
      },
      scales: {
        y: {
          beginAtZero: yBeginAtZero,
          grid: {
            display: displayYGrid,
          },
          title: {
            display: displayYTitle,
            text: "Quantity",
          },
        },
        x: {
          beginAtZero: xBeginAtZero,
          grid: {
            display: displayXGrid,
          },
          title: {
            display: displayXTitle,
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
