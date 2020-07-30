import { Component, OnInit } from '@angular/core';
import * as dc from 'dc';
import * as d3 from 'd3';
import crossfilter from 'crossfilter2';

import { ChartService } from '../chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit {
  private places: Array<string>;
  private chart: any;

  constructor(private chartService: ChartService) {}
  
  ngOnInit() {
     this.chart = dc.barChart("#divchart");

     this.chartService.getPlaces()
                      .subscribe(res => this.places = res,
                                 err => console.error(err),
                                 () => console.log('getPlaces() done'));
  }

  displaySalesOfAPlace($event) {
     let selectElement = $event.target;
     let optionIndex = selectElement.selectedIndex;
     let place = selectElement.options[optionIndex].text;
     this.chartService.getSalesDataOfaPlace(place)
                      .subscribe(res =>  this.createChart(res),
                                 err => console.error(err),
                                 () => console.log('getSalesData() done'));
  }

  createChart(data) {
     let ndx = crossfilter(data);

     let productDimension = ndx.dimension(function(d) {return d.name;});
     let sumGroup         = productDimension.group().reduceSum(function(d) {return d.sales;});

     this.chart
         .width(data.length*120)
         .height(300)
         .x(d3.scale.ordinal())
         .xUnits(dc.units.ordinal)
         .xAxisLabel('Products')
         .yAxisLabel('Quantities')
         .dimension(productDimension)
         .barPadding(0.2)
         .group(sumGroup);

     this.chart.render();
  }
}


