import { Component, Input, OnInit } from '@angular/core';
import { FoodModel } from '../../../../core/models/food.model';

@Component({
  selector: 'app-item-food',
  templateUrl: './item-food.component.html',
  styleUrls: ['./item-food.component.css']
})
export class ItemFoodComponent implements OnInit {

  @Input() food: FoodModel | null = null;
  seccion: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeSeccion (seccion: number) {
    this.seccion = seccion;
  }

}
