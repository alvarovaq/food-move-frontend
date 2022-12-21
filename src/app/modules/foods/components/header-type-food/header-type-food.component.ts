import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-type-food',
  templateUrl: './header-type-food.component.html',
  styleUrls: ['./header-type-food.component.css']
})
export class HeaderTypeFoodComponent implements OnInit {

  @Input() title: string = "";
  @Input() icon: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
