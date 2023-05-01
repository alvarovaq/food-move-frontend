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
import { GraphicStructure } from '@modules/graphics/interfaces/graphic-structure.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { DateRange } from '@core/interfaces/date-range';
import { OptionalPipe } from '@shared/pipes/optional.pipe';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  timeData = newTimeData('prueba', []);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  graphics: Array<GraphicStructure> = [
    {
      key: 'masa',
      color: [148,159,177],
      timeData: newTimeData('Masa [Kg]', []),
      loading: false
    },
    {
      key: 'imc',
      color: [255,110,110],
      timeData: newTimeData('Índece de Masa Corporal (IMC) [Kg/m2]', []),
      loading: false
    },
    {
      key: 'per_abdominal',
      color: [255,251,110],
      timeData: newTimeData('Perímetro Abdominal [cm]', []),
      loading: false
    },
    {
      key: 'tension',
      color: [100,255,0],
      timeData: newTimeData('Tensión Arterial [mmHg]', []),
      loading: false
    },
    {
      key: 'trigliceridos',
      color: [0,209,255],
      timeData: newTimeData('Triglicéridos Séricos', []),
      loading: false
    },
    {
      key: 'hdl',
      color: [208,0,255],
      timeData: newTimeData('HDL - Colesterol', []),
      loading: false
    },
    {
      key: 'ldl',
      color: [255,174,0],
      timeData: newTimeData('LDL - Colesterol', []),
      loading: false
    },
    {
      key: 'hemoglobina',
      color: [0,255,205],
      timeData: newTimeData('Hemoglobina Glicosilada (hba1c)', []),
      loading: false
    },
    {
      key: 'glucosa',
      color: [50,50,50],
      timeData: newTimeData('Glucosa en Plasma', []),
      loading: false
    }
  ];

  constructor(
    private readonly consultsService: ConsultsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService,
    private readonly optionalPipe: OptionalPipe
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        this.loadGraphics();
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  loadGraphics (): void {
    const graphicsCpy = [...this.graphics];
    const dateRange = this.getDateRange();
    graphicsCpy.forEach((graphic, i) => {
      this.graphics[i].loading = true;
      this.consultsService.getValues(this.patient!._id, graphic.key, dateRange)
      .pipe(finalize(() => this.graphics[i].loading = false))
      .subscribe(
        res => {
          this.graphics[i].timeData.data = measures2PointsData(res);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getDateRange (): DateRange {
    const object = {
      startDate: this.range.value.start,
      endDate: this.range.value.end
    };
    return this.optionalPipe.transform(object);
  }

  setDateRange (): void {
    this.loadGraphics();
  }

  resetDateRange (): void {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.loadGraphics();
  }

}
