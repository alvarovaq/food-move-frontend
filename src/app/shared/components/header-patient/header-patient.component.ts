import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

  @Input() name: string = "";
  @Input() title: string = "";

  constructor(
    private readonly routerService: RouterService
  ) { }

  ngOnInit(): void {
  }

  exit (): void {
    this.routerService.goToPatients();
  }

}
