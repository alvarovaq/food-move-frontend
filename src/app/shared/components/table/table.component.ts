import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableStructure } from '@core/interfaces/table-structure';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() tableStructure: TableStructure[] = [];
  @Input() indexDisplay: number = 10;
  
  @Input() limit: number = 0;
  @Input() total: number = 0;
  @Input() page: number = 0;
  @Input() sortActive: string = "name";
  @Input() viewOption: boolean = false;

  @Output() reset = new EventEmitter<boolean>();
  @Output() changePage = new EventEmitter<PageEvent>();
  @Output() changeSort = new EventEmitter<Sort>();
  @Output() view = new EventEmitter<any>(); 
  @Output() info = new EventEmitter<any>(); 
  @Output() edit = new EventEmitter<any>(); 
  @Output() delete = new EventEmitter<any>(); 

  constructor() {}

  ngOnInit(): void {
  }

  getColumnsToDisplay(): string[] {
    return [...this.tableStructure.filter((element) => {return element.index <= this.indexDisplay}).map((element) => {return element.field}), 'actions'];
  }

  resetTable () {
    this.reset.emit(true);
  }

  changePageTable (value: PageEvent) {
    this.changePage.emit(value);
  }

  changeSortTable (value: Sort) {
    this.changeSort.emit(value);
  }

  viewElement (element: any) {
    this.view.emit(element);
  }

  infoElement (element: any) {
    this.info.emit(element);
  }

  editElement (element: any) {
    this.edit.emit(element);
  }

  deleteElement (element: any) {
    this.delete.emit(element);
  }

}
