import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars Per Language",
        //Set the chart subcaption
        subCaption: "",
        //Set the x-axis name
        xAxisName: "Language",
        //Set the y-axis name
        yAxisName: "Users",
        showPercentValues: 0,
        //Set the theme for your chart
        theme: "candy",
        decimals: 0,
        doughnutRadius: "45%",
      },
      // Chart Data
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
