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

  constructor() { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    let element = document.getElementById('barchart');
    this.width = this.svgWidth + this.margin.left + this.margin.right;
    this.height = this.svgHeight + this.margin.top + this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', this.width + 50)
      .attr('height', this.height + 50);


    let data = [{
      val: 10,
      label: 'PC1'
    }, {
      val: 20,
      label: 'PC2'
    }, {
      val: 30,
      label: 'PC3'
    }, {
      val: 40,
      label: 'PC4'
    }, {
      val: 50,
      label: 'PC5'
    }];

    const yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(data, (d) => d.val)]);

    const xScale = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.label))
      .padding(0.1);

    var chart = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    chart.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale));

    chart.append("g")
      .call(d3.axisLeft(yScale));

    const barGroups = chart.selectAll()
      .data(data)
      .enter()
      .append('g');

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.val))
      .attr('height', (d) => this.height - yScale(d.val))
      .attr('width', xScale.bandwidth());

  }

}
