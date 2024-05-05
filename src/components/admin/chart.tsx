import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

interface ChartProps {
  bar: any;
  pie: any;
}

export default function Chart({ bar, pie }: ChartProps) {
  const data = {
    labels: bar.labels ? bar.labels : [],
    datasets: [
      {
        label: "Commandes mensulles",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 0.9)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: bar.data ? bar.data : [],
      },
    ],
  };

  const pieData = {
    labels: pie.months ? pie.months : [],
    datasets: [
      {
        label: "Commandes mensulles",
        data: pie.counts ? pie.counts : [],
        backgroundColor: pie.colors ? pie.colors : [],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 h-full w-full mx-6">
      <div
        className="hidden lg:flex items-start justify-start"
        style={{ height: "100%", width: "100%" }}
      >
        <Bar data={data} />
      </div>

      <div
        className="hidden lg:flex items-center justify-center"
        style={{ height: "70%", width: "100%" }}
      >
        <Pie data={pieData} />
      </div>
      <div className="lg:hidden block" style={{ height: "40%", width: "90%" }}>
        <Bar data={data} />
      </div>

      <div className="lg:hidden block" style={{ height: "40%", width: "100%" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
