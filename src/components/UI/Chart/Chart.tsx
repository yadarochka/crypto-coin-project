import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  coinData: number[];
  coinLabels: string[];
  onMouseEvent?: boolean;
  className?: string;
};
const Chart = ({
  coinData,
  coinLabels,
  onMouseEvent = true,
  className,
}: ChartProps) => {
  // console.warn("Chart render")
  const data = {
    labels: coinLabels,
    datasets: [
      {
        label: "$",
        data: coinData,
        borderColor: "rgba(0, 99, 245, 1)",
        backgroundColor: "#F5F5F5",
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: 0.2,
      },
    ],
  };

  const options = {
    ...(!onMouseEvent && { events: [] }),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: onMouseEvent,
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        caretSize: 10,
        backgroundColor: "rgba(0,0,0,.9)",
        bodyFontSize: 15,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      xAxes: {
        display: false,
        gridLines: {},
      },
      yAxes: {
        display: false,
        gridLines: {},
      },
    },
  };
  return <Line options={options} data={data} className={className} />;
};

export default Chart;
