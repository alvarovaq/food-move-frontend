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
      timeData: newTimeData('Masa [Kg]', [])
    },
    {
      key: 'imc',
      color: [255,110,110],
      timeData: newTimeData('Índece de Masa Corporal (IMC) [Kg/m2]', [])
    },
    {
      key: 'per_abdominal',
      color: [255,251,110],
      timeData: newTimeData('Perímetro Abdominal [cm]', [])
    },
    {
      key: 'tension',
      color: [100,255,0],
      timeData: newTimeData('Tensión Arterial [mmHg]', [])
    },
    {
      key: 'trigliceridos',
      color: [0,209,255],
      timeData: newTimeData('Triglicéridos Séricos', [])
    },
    {
      key: 'hdl',
      color: [208,0,255],
      timeData: newTimeData('HDL - Colesterol', [])
    },
    {
      key: 'ldl',
      color: [255,174,0],
      timeData: newTimeData('LDL - Colesterol', [])
    },
    {
      key: 'hemoglobina',
      color: [0,255,205],
      timeData: newTimeData('Hemoglobina Glicosilada (hba1c)', [])
    },
    {
      key: 'glucosa',
      color: [50,50,50],
      timeData: newTimeData('Glucosa en Plasma', [])
    }
  ];

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
    graphicsCpy.forEach((graphic, i) => {
      this.consultsService.getValues(this.patient!._id, graphic.key, {startDate: new Date(2023,1,1), endDate: new Date(2024,1,1)})
      .subscribe(
        res => {
          this.graphics[i].timeData.data = measures2PointsData(res);
        }
      );
    });
  }

  getDateRange (): DateRange {
    return {
      startDate: this.range.value.start,
      endDate: this.range.value.end
    }
  }

}
