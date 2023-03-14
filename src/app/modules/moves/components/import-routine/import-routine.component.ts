import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoutineModel } from '@core/models/routine.model';
import { RoutinesService } from '@core/services/routines.service';

@Component({
  selector: 'app-import-routine',
  templateUrl: './import-routine.component.html',
  styleUrls: ['./import-routine.component.css', '../../../../../assets/styles/import.css']
})
export class ImportRoutineComponent implements OnInit {

  dataSource: RoutineModel[] = [];
  routine: RoutineModel[] = [];
  selected: RoutineModel | null = null;

  constructor(
    private readonly routinesService: RoutinesService,
    private readonly dialogRef: MatDialogRef<ImportRoutineComponent>
  ) { }

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines (): void {
    this.routinesService.filter({})
    .subscribe(
      res => {
        this.routine = res.items;
        this.dataSource = [...this.routine];
      },
      err => {
        console.log(err);
      }
    )
  }

  selectRoutine (routine: RoutineModel): void {
    this.selected = routine;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const cpy_data = [...this.routine];
    this.dataSource = cpy_data.filter((routine) =>  routine.title.trim().toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  exit (): void {
    this.dialogRef.close();
  }

}
