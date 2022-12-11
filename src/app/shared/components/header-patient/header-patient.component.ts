import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

  @Input() id: string | null = "";
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
    if (!this.id) return;
    this.routerService.goToGraphics(this.id);
  }

  goToConsults (): void {
    if (!this.id) return;
    this.routerService.goToConsults(this.id);
  }

  goToFoods (): void {
    if (!this.id) return;
    this.routerService.goToFoods(this.id);
  }

  goToMoves (): void {
    if (!this.id) return;
    this.routerService.goToMoves(this.id);
  }

}
