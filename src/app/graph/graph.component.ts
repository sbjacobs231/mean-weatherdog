import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as axis from 'd3-axis';
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
          var prefix = each['FCTTIME'];
          return {
            date:
              prefix['hour'] +
              ' ' +
              prefix['mon_abbrev'] +
              ' ' +
              prefix['mday_padded'] +
              ' ' +
              prefix['year'],
            temp: each['temp']['english'],
            humidity: each['humidity']
          };
        })
        .slice(0, 12);
      this.drawCharts();
    });
  }

  drawCharts() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 40, bottom: 30, left: 30 };
    var width = 930 - margin.left - margin.right;
    var height = 275 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse('%H %b %d %Y');

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var xAxis = axis.axisBottom(x).tickFormat(d3.timeFormat('%I %p'));
    var yAxis = axis.axisLeft(y);

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
      d['date'] = +parseTime(d['date']);
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
    var last;
    svg
      .append('path')
      .data([this.dataGraph])
      .attr('d', valueline1)
      .attr('style', 'fill: none; stroke: #FF9200; stroke-width: 3px;');
    svg
      .append('text')
      .data(this.dataGraph, () => {
        last = this.dataGraph[this.dataGraph.length - 1];
      })
      .attr('transform', d => {
        return 'translate(' + x(last.date) + ',' + y(last.temp) + ')';
      })
      .text('Temp');

    // Add the valueline path.
    svg
      .append('path')
      .data([this.dataGraph])
      .attr('d', valueline2)
      .attr('style', 'fill: none; stroke: #008FDE; stroke-width: 3px;');
    svg
      .append('text')
      .data(this.dataGraph, () => {
        last = this.dataGraph[this.dataGraph.length - 1];
      })
      .attr('transform', d => {
        return 'translate(' + x(last.date) + ',' + y(last.humidity) + ')';
      })
      .text('Humidity');
    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');
    // Text Styling
    d3
      .selectAll('text')
      .style('font-size', 14)
      .style('color', '#555555');
  }
}
