import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

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

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    let element = document.getElementById('chart');
    this.width = this.svgWidth + this.margin.left + this.margin.right;
    this.height = this.svgHeight + this.margin.top + this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', this.width + 50)
      .attr('height', this.height + 50);

    
    let data = [10,20,30,40,50];
    // let data = [50,40,30,20,10];

    const yScale = d3.scaleLinear()
    .range([this.height, 0])
    .domain([0, d3.max(data)]);
    
    const xScale = d3.scaleLinear()
    .range([0, this.width])
    .domain([0, data.length]);

    var line = d3.line()
      .x(function(d, i) { return xScale(i)})
      .y(function(d) { return yScale(d)});   

      var g = this.svg.append("g")   
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")"   );

      g.append("g")   
      .attr("transform", "translate(0," + this.height + ")")   
      .call(d3.axisBottom(xScale));

      g.append("g")   
      .call(d3.axisLeft(yScale))   
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em");

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
