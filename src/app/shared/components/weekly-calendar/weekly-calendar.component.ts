import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodToolService } from '@core/services/food-tool.service';
import { WeekdayType } from './enums/weekday-type';
import { WeekdayItem } from './interfaces/weekday-item.interface';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {

  @Input() weekdays: WeekdayItem[] = [];
  @Input() type: WeekdayType = WeekdayType.Food;
  @Input() showDate: boolean = true;

  @Output() add = new EventEmitter<WeekdayItem>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  
  weekdayType = WeekdayType;

  constructor(
    public readonly foodToolService: FoodToolService
  ) { }

  ngOnInit(): void {
  }

  addItem (weekday: WeekdayItem) {
    this.add.emit(weekday);
  }

  editItem (item: any) {
    this.edit.emit(item);
  }

  deleteItem (item: any) {
    this.delete.emit(item);
  }

}
