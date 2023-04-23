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

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  timeData = newTimeData('prueba', []);

  graphics: Array<GraphicStructure> = [
    {
      key: 'masa',
      color: [148,159,177],
      timeData: newTimeData('Masa [Kg]', [])
    },
    {
      key: 'imc',
      color: [148,159,177],
      timeData: newTimeData('Índece de Masa Corporal (IMC) [Kg/m2]', [])
    },
    {
      key: 'per_abdominal',
      color: [148,159,177],
      timeData: newTimeData('Perímetro Abdominal [cm]', [])
    },
    {
      key: 'tension',
      color: [148,159,177],
      timeData: newTimeData('Tensión Arterial [mmHg]', [])
    },
    {
      key: 'trigliceridos',
      color: [148,159,177],
      timeData: newTimeData('Triglicéridos Séricos', [])
    },
    {
      key: 'hdl',
      color: [148,159,177],
      timeData: newTimeData('HDL - Colesterol', [])
    },
    {
      key: 'ldl',
      color: [148,159,177],
      timeData: newTimeData('LDL - Colesterol', [])
    },
    {
      key: 'hemoglobina',
      color: [148,159,177],
      timeData: newTimeData('Hemoglobina Glicosilada (hba1c)', [])
    },
    {
      key: 'glucosa',
      color: [148,159,177],
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

}
