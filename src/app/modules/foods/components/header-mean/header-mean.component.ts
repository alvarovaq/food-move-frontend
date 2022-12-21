import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-mean',
  templateUrl: './header-mean.component.html',
  styleUrls: ['./header-mean.component.css']
})
export class HeaderMeanComponent implements OnInit {

  @Input() title: string = "";
  @Input() icon: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
