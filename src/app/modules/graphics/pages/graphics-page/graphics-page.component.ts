import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../../../core/services/patients.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { LoaderService } from '../../../../core/services/loader.service';
import { RouterService } from '../../../../core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  constructor(
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
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  newDate (days: number): Date {
    return DateTime.now().plus({days}).toJSDate();
  }

  newDateString (days: number): string | null {
    return DateTime.now().plus({days}).toISO();
  }

  public lineChartData = {
    datasets: [
      {
        data: [ {x: this.newDateString(1), y: 120}, {x: this.newDateString(3), y: 100}, {x: this.newDateString(6), y: 115}, {x: this.newDateString(7), y: 119}],
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

  public lineChartOptions: ChartConfiguration['options'] = {
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
      y: {
        position: 'left',
      },
    },

    plugins: {
      legend: { display: true },
      /*annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }*/
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
