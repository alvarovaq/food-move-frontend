import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

  @Input() id: string = "";
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

  goToGraphics (): void {
    this.routerService.goToGraphics(this.id);
  }

  goToConsults (): void {
    this.routerService.goToConsults(this.id);
  }

  goToFoods (): void {
    this.routerService.goToFoods(this.id);
  }

  goToMoves (): void {
    this.routerService.goToMoves(this.id);
  }

}
