import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromLocation from '../forecast/store/location.reducers';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  dataStore: Observable<fromLocation.State>;
  dataGraph: object[];

  constructor(private store: Store<fromLocation.AppState>) {}

  ngOnInit() {
    this.dataStore = this.store.select('weatherLocation');
    this.dataStore.subscribe(d => {
      this.dataGraph = d.hourlyArray
        .map(each => {
          return {
            date: each['FCTTIME']['hour'],
            temp: each['temp']['english'],
            humidity: each['humidity']
          };
        })
        .slice(0, 13);
      this.drawCharts();
    });
  }

  drawCharts() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 40, bottom: 30, left: 30 };
    var width = 930 - margin.left - margin.right;
    var height = 275 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse('%H');

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline1 = d3
      .line()
      .x(d => {
        return x(d.date);
      })
      .y(d => {
        return y(d.temp);
      });

    // define the line
    var valueline2 = d3
      .line()
      .x(d => {
        return x(d.date);
      })
      .y(d => {
        return y(d.humidity);
      });

    var svg = d3.select('svg');
    svg.selectAll('*').remove(); // delete previous graphs
    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.dataGraph.forEach(d => {
      d['date'] = parseTime(d['date']);
      // d['temp'] = +d['temp'];
      // d['humidity'] = +d['humidity'];
    });

    // sort years ascending
    this.dataGraph.sort((a, b) => {
      return a['date'] - b['date'];
    });

    // Scale the range of the data
    x.domain(
      d3.extent(this.dataGraph, d => {
        return d.date;
      })
    );
    y.domain([
      d3.min(this.dataGraph, d => {
        return Math.min(d.temp, d.humidity) - 5;
      }),
      d3.max(this.dataGraph, d => {
        return Math.max(d.temp, d.humidity) + 5;
      })
    ]);

    // Add the valueline path.
    svg
      .append('path')
      .data([this.dataGraph])
      .attr('class', 'line')
      .attr('d', valueline1)
      .attr('style', 'fill: none; stroke: #008FDE; stroke-width: 3px;');
    svg
      .append('text')
      .text('Temp')
      .attr('x', width)
      .data(this.dataGraph)
      .attr('transform', d => {
        return 'translate(' + x(d.date) + ',' + y(d.temp) + ')';
      });

    // Add the valueline path.
    svg
      .append('path')
      .data([this.dataGraph])
      .attr('class', 'line')
      .attr('d', valueline2)
      .attr('style', 'fill: none; stroke: orange; stroke-width: 3px;');
    svg
      .append('text')
      .text('Humidity')
      .attr('x', width)
      .data(this.dataGraph)
      .attr('transform', d => {
        return 'translate(' + x(d.date) + ',' + y(d.humidity) + ')';
      });
    // Add the X Axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g').call(d3.axisLeft(y));

    d3
      .selectAll('text')
      .style('font-size', 14)
      .style('color', '#555555');
  }
}
