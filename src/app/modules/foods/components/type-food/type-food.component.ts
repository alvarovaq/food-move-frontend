import { Component, Input, OnInit } from '@angular/core';
import { FoodModel } from '../../../../core/models/food.model';

@Component({
  selector: 'app-type-food',
  templateUrl: './type-food.component.html',
  styleUrls: ['./type-food.component.css']
})
export class TypeFoodComponent implements OnInit {

  @Input() foods: FoodModel[] = [];
  @Input() title: string = "";
  @Input() icon: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
