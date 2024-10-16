import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data2;

    // Grouping data by 'day' and calculating the average tip for each day
    var groupedData = d3.rollups(
      data,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    );

    // Sort by day order (assuming it's Sun, Sat, Thur, Fri)
    var daysOrder = ["Sun", "Sat", "Thur", "Fri"];
    groupedData = groupedData.sort(
      (a, b) => daysOrder.indexOf(a[0]) - daysOrder.indexOf(b[0])
    );

    var margin = { top: 40, right: 20, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .style("border", "1px solid #ccc")  // Outline the SVG
      .style("margin-bottom", "40px")     // Add margin to space out the charts
      .select(".g_2")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x-axis
    var x_scale = d3
      .scaleBand()
      .domain(groupedData.map((d) => d[0]))
      .range([0, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x_scale));

    // x-axis label
    container
      .selectAll(".x_label")
      .data([0])
      .join("text")
      .attr("class", "x_label")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom - 15)
      .style("text-anchor", "middle")
      .style("font-family","'Times New Roman', Times, serif")
      .style("font-size", "15px")
      .text("Day");

    // y-axis
    var y_scale = d3.scaleLinear().domain([0, d3.max(groupedData, (d) => d[1])]).range([h, 0]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .call(d3.axisLeft(y_scale));

    // y-axis label
    container
      .selectAll(".y_label")
      .data([0])
      .join("text")
      .attr("class", "y_label")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", -margin.left + 15)
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-family","'Times New Roman', Times, serif")
      .text("Average Tip");

    // Title
    container
      .selectAll(".title")
      .data([0])
      .join("text")
      .attr("class", "title")
      .attr("x", w / 2)
      .attr("y", -20)
      .style("text-anchor", "middle")
      .style("font-size", "17px")
      .style("font-family","'Times New Roman', Times, serif")
      .text("Average Tip by Day");

    // Bar chart creation
    container
      .selectAll(".bar")
      .data(groupedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d[0]))
      .attr("y", (d) => y_scale(d[1]))
      .attr("width", x_scale.bandwidth())
      .attr("height", (d) => h - y_scale(d[1]))
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
