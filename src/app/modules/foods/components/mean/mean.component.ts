import { Component, Input, OnInit } from '@angular/core';
import { FoodModel } from '../../../../core/models/food.model';

@Component({
  selector: 'app-mean',
  templateUrl: './mean.component.html',
  styleUrls: ['./mean.component.css']
})
export class MeanComponent implements OnInit {

  @Input() foods: FoodModel[] = [];
  @Input() title: string = "";
  @Input() icon: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
