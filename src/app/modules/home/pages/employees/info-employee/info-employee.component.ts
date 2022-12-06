import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '@core/models/employee';

@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.css']
})
export class InfoEmployeeComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly employee: Employee
  ) {}

  ngOnInit(): void {
  }

}
