import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodToolService } from '@core/services/food-tool.service';
import { WeekdayType } from './enums/weekday-type';
import { Weekday } from './interfaces/weekday.interface';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {

  @Input() weekdays: Weekday[] = [];
  @Input() type: WeekdayType = WeekdayType.Food;

  @Output() add = new EventEmitter<Weekday>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  
  weekdayType = WeekdayType;

  constructor(
    public readonly foodToolService: FoodToolService
  ) { }

  ngOnInit(): void {
  }

  addItem (weekday: Weekday) {
    this.add.emit(weekday);
  }

  editItem (item: any) {
    this.edit.emit(item);
  }

  deleteItem (item: any) {
    this.delete.emit(item);
  }

}
