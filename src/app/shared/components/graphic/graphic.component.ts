import { Component, Input, OnInit } from '@angular/core';
import { Measure } from '@core/interfaces/measure';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DateTime } from 'luxon';
import { TimeData } from './interfaces/time-data.interface';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  @Input() timeData?: TimeData;

  constructor() { }

  ngOnInit(): void {
  }

  get lineChartData () {
    return {
      datasets: [{
        data: this.timeData?.data,
        label: this.timeData?.label,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }]
    };
  }

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'DD T',
          unit: 'day'
        }
      },
    },

    plugins: {
      legend: { display: true }
    }
  };

  lineChartType: ChartType = 'line';

}
