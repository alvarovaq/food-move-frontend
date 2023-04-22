import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../../../core/services/patients.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { LoaderService } from '../../../../core/services/loader.service';
import { RouterService } from '../../../../core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import { Measure } from '@core/interfaces/measure';
import { ConsultsService } from '@core/services/consults.service';
import { measures2PointsData, newTimeData } from '@shared/components/graphic/utils/graphic-utils';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  measures: Array<Measure> = [];
  timeData = newTimeData('prueba', []);

  constructor(
    private readonly consultsService: ConsultsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        this.consultsService.getValues(res!._id, 'masa', {startDate: new Date(2023,1,1), endDate: new Date(2024,1,1)})
        .subscribe(
          res => {
            this.measures = res;
            this.timeData.data = measures2PointsData(this.measures);
            this.lineChartData = {
              datasets: [
                {
                  data: this.measures.map((measure) => {return {x: this.newDateString(new Date(measure.date)), y: measure.value}}),
                  label: 'Series A',
                  backgroundColor: 'rgba(148,159,177,0.2)',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                  fill: 'origin',
                }
              ]
            };
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  test () {
    this.timeData.data = [];
    /*this.lineChartData = {
      datasets: [
        {
          data: [],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ]
    };*/
  }

  newDate (days: number): Date {
    return DateTime.now().plus({days}).toJSDate();
  }

  newDateString (date: Date): string | null {
    return DateTime.fromJSDate(date).toISO();
  }

  lineChartData = {
    datasets: [
      {
        data: this.measures.map((measure) => {return {x: this.newDateString(measure.date), y: measure.value}}),
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ]
  };

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
