import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data1;
    var margin = { top: 40, right: 20, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
  
    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .style("border", "1px solid #ccc")  // Outline the SVG
      .select(".g_1")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // x-axis
    var x_data = data.map((item) => item.total_bill);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)])  // Ensure it starts from 0
      .range([0, w]);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0,${h})`)  // Move the x-axis to the bottom
      .call(d3.axisBottom(x_scale));
  
    // x-axis label
    container
      .selectAll(".x_label")
      .data([0])
      .join("text")
      .attr("class", "x_label")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom - 10)
      .style("text-anchor", "middle")
      .style("font-family","'Times New Roman', Times, serif")
      .style("font-size", "15px")
      .text("Total Bill");
  
    // y-axis
    var y_data = data.map((item) => item.tip);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])  // Ensure it starts from 0
      .range([h, 0]);
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
      .style("font-family","'Times New Roman', Times, serif")
      .style("font-size", "15px")
      .text("Tips");
  
    // Title
    container
      .selectAll(".title")
      .data([0])
      .join("text")
      .attr("class", "title")
      .attr("x", w / 2)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .style("font-family","'Times New Roman', Times, serif")
      .style("font-size", "17px")
      .text("Total Bill vs Tips");
  
    // Scatter plot creation
    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x_scale(d.total_bill))
      .attr("cy", (d) => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }
  

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
