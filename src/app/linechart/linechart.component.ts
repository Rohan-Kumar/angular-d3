import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

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
    let element = document.getElementById('linechart');
    this.width = this.svgWidth + this.margin.left + this.margin.right;
    this.height = this.svgHeight + this.margin.top + this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', this.width + 50)
      .attr('height', this.height + 50);


    let data = [10, 20, 30, 40, 50];
    // let data = [50,40,30,20,10];

    const yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(data)]);

    const xScale = d3.scaleLinear()
      .range([0, this.width])
      .domain([0, data.length]);

    var line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) =>  yScale(d));

    var g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    g.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  }

}
