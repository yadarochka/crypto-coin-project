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

import React, { memo, useMemo } from "react";
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
  type?: string;
  color?: string;
  label?: string;
};
const Chart = ({
  coinData,
  coinLabels,
  onMouseEvent = true,
  className,
  type = "",
  color = "rgba(0, 99, 245, 1)",
  label,
}: ChartProps) => {
  let labels = coinLabels,
    datas = coinData;
  if (!onMouseEvent) {
    labels = coinLabels.filter((item, index) => index % 5 === 0);
    datas = coinData.filter((item, index) => index % 5 === 0);
  }

  const data = {
    labels: labels ? labels : coinLabels,
    datasets: [
      {
        label: label,
        data: datas ? datas : coinData,
        borderColor: color,
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
    responsive: true,
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
      yAxes: {
        display: false,
        gridLines: {},
      },
      x: {
        ticks: {
          autoSkip: true,
          autoSkipPadding: 25,
          callback: (value: any, index: any, ticks: any) => {
            if (!type) return coinLabels[index];
            const date = coinLabels[index].split(",");
            const time = date[1].split(":");
            const day = date[0].split(".");
            if (type === "day") return time[0] + ":" + time[1];
            if (type === "year") return day[2];
            if (type === "week") return day[0] + "." + day[1];
          },
        },
        ...(type ? { display: true } : { display: false }),
        gridLines: {},
      },
    },
  };

  return <Line options={options} data={data} className={className} />;
};

export default memo(Chart);
