import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  private svgWidth = 600;
  private svgHeight = 400;
  private margin = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 20
  };
  private width;
  private height;
  private svg: any;

  constructor() { }

  ngOnInit(): void {
    let element = document.getElementById('scatterplot');
    this.width = this.svgWidth + this.margin.left + this.margin.right;
    this.height = this.svgHeight + this.margin.top + this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', this.width + 50)
      .attr('height', this.height + 50);

    let data = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [50, 50]
    ];

    const yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, 50]);

    const xScale = d3.scaleLinear()
      .range([0, this.width])
      .domain([0, 50]);

    var chart = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    chart.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale));

    chart.append("g")
      .call(d3.axisLeft(yScale));

    const scatterplot = chart.selectAll()
      .data(data)
      .enter()
      .append('g');

    scatterplot
    .append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]));

  }

}
