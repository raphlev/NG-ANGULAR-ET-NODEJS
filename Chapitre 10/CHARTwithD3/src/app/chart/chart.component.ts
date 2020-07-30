import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

import { ChartService } from '../chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit {
  private data: Array<any> = [];
  private svg: any;
  private places: Array<string>;

  private barWidth :number = 30;
  private margin :number = 20;
  private xAxisWidth :number;
  private yAxisHeight :number;
  private xScale: any;
  private yScale: any;
  private colors: Array<string> = ['red', 'blue', 'yellow', 'green'];

  constructor(private chartService: ChartService) {}
  
  ngOnInit() {
     this.svg = d3.select("#divchart").append("svg").attr("width", "100%").attr("height", 500);
     this.chart = this.svg.append("g");
    
     this.chartService.getPlaces()
                      .subscribe(res => this.places = res,
                                 err => console.error(err),
                                 () => console.log('getPlaces() done'));
  }

  displaySalesOfAPlace($event) {
    let selectElement = $event.target;
    let optionIndex = selectElement.selectedIndex;
    let place = selectElement.options[optionIndex].text;
    console.log("Affichage des ventes de "+place);
    this.chartService.getSalesDataOfaPlace(place)
                     .subscribe(res => {let salesMax :number = 0;
		                        this.data = [];
                                        for (let product of res) {
                                             this.data.push([product.name, product.sales]);
					     if (product.sales > salesMax) salesMax = product.sales;
					     this.places.push();
					}
					this.chart.remove();
                                        this.chart = this.svg.append("g");
                                        this.createAxis(this.data.length, salesMax);
					this.createBars();
					this.chart.attr("transform",  `translate(0, ${this.margin}) scale(1.5)`);
                                },
                                err => console.error(err),
                                () => console.log('getSalesData() done'));
  }


  createAxis(nbProducts :number, salesMax :number) {
     this.xAxisWidth = (this.barWidth + this.margin)*nbProducts;
     this.yAxisHeight = salesMax + this.margin;

     let xDomain = this.data.map(d => d[0]);
     this.xScale = d3.scaleBand().domain(xDomain).range([0, this.xAxisWidth]);
     let yDomain = [0, salesMax];
     this.yScale = d3.scaleLinear().domain(yDomain).range([this.yAxisHeight, 0]);
     
     this.chart
         .append("g")
         .attr("transform", `translate(${this.margin}, ${this.yAxisHeight})`)
         .call(d3.axisBottom(this.xScale));

     this.chart.append("g")
         .attr("transform", `translate(${this.margin}, 0)`)
         .call(d3.axisLeft(this.yScale));	 
  }

  createBars() {
    this.chart.selectAll().data(this.data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.margin*1.5 + i*(this.margin+this.barWidth))
        .attr('y', d => this.yAxisHeight - d[1] )
        .attr('width', this.barWidth)
        .attr('height', d => d[1])
        .style('fill', (d, i) => this.colors[i%this.colors.length]);
  }

}


