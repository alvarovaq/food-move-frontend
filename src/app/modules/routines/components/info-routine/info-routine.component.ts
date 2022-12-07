import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoutineModel } from '@core/models/routine.model';

@Component({
  selector: 'app-info-routine',
  templateUrl: './info-routine.component.html',
  styleUrls: ['./info-routine.component.css', '../../../../shared/styles/info-dialog.css']
})
export class InfoRoutineComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoRoutineComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly routine: RoutineModel
  ) {}

  ngOnInit(): void {
  }

}
