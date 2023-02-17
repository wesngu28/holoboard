"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, Plugin } from 'chart.js';
import { SubStatus } from "../../models/VideoStatus";

interface Props {
  datas: SubStatus[],
  filter: string,
}

export default function LicensedBar({filter, datas}: Props) {
  const plugins: Plugin = {
      id: "add pics",
      afterDraw: async (chart) => {
        const actualOrder = chart.data.labels!
        const reorderedDatas = actualOrder.map(label => {
          return datas.find(data => data.name === label);
        });
        let { ctx } = chart;
        ctx.save();
        let xAxis = chart.scales.x;
        let yAxis = chart.scales.y;
        for (let i = 0; i < yAxis.ticks.length; i++) {
          const img = new Image()
          img.src = `/${reorderedDatas[i]?.name}.jpg`
          ctx.drawImage(img, xAxis.left - 55, yAxis.getPixelForTick(i) -25, 50, 50);
        }
        ctx.restore();
      }
    };

  ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, [plugins]);
  return (
    <Bar
      data={{
        labels: datas.map((data) => data.name),
        datasets: [
          {
            data: datas.map((data: any) => data[filter]),
            backgroundColor: datas.map(data => data.color),
            barThickness: 20,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
          padding: {
            left: 50
          }
        },
        scales: {
          y: {
            ticks: {
              display: false
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  )
}