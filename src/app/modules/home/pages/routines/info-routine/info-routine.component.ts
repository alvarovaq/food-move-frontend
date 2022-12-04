import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Routine } from 'src/app/core/models/routine';

@Component({
  selector: 'app-info-routine',
  templateUrl: './info-routine.component.html',
  styleUrls: ['./info-routine.component.css']
})
export class InfoRoutineComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoRoutineComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly routine: Routine
  ) {}

  ngOnInit(): void {
  }

}
