import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Language", "Speakers (in millions)"],
  ["Assamese", 10],
  ["Winner", 80],
  ["Team", 5],
  ["Stakers", 5],
 
];

export const options = {
  title: "",
  backgroundColor: "transparent",
  legend: "none",
  pieSliceText: "label",
  colors: ["#752CE8","#3B57EE","#3D78FD", "#35D2E2"],
  fill:false,
  is3D: true,
  slices: {
    4: { offset: 0.2 },
    12: { offset: 0.3 },
    14: { offset: 0.4 },
    15: { offset: 0.5 },
  },
};

const PieChart = ()=> {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"100%"}
      fill={"none"}
    />
  );
}

export default PieChart;
