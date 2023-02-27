import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../../core/services/router.service';
import { PatientModel } from '../../../core/models/patient.model';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

  @Input() patient: PatientModel | null = null;
  @Input() title: string = "";

  constructor(
    private readonly routerService: RouterService
  ) { }

  ngOnInit(): void {
  }

  exit (): void {
    this.routerService.goToPatients();
  }

  goToGraphics (): void {
    if (!this.patient) return;
    this.routerService.goToGraphics();
  }

  goToConsults (): void {
    if (!this.patient) return;
    this.routerService.goToConsults();
  }

  goToFoods (): void {
    if (!this.patient) return;
    this.routerService.goToFoods();
  }

  goToMoves (): void {
    if (!this.patient) return;
    this.routerService.goToMoves();
  }

}
