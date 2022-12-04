import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Routine } from 'src/app/core/models/routine';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RoutinesService } from 'src/app/core/services/routines.service';
import { finalize  } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RoutingService } from 'src/app/core/services/routing.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackerService } from 'src/app/core/services/snacker.service';
import { InfoRoutineComponent } from './info-routine/info-routine.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-moves',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css', '../../../../shared/styles/crud.css']
})
export class RoutinesComponent implements OnInit {

  listRoutines: Routine[] = [];
  isSmall: boolean = false;
  search: string = '';

  displayedColumns: string[] = ['title', 'description'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly routinesService: RoutinesService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.loadRoutines();
    this.setColumnsBySize();
  }

  loadRoutines (): void {
    this.loaderService.isLoading.next(true);
    this.routinesService.getRoutines()
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.listRoutines = [...res];
        this.dataSource = new MatTableDataSource(this.listRoutines);     
      },
      err => console.log(err)
    );
    this.dataSource = new MatTableDataSource(this.listRoutines);
  }

  getTitleColumn (column: string): string {
    switch (column) {
      case "title":
        return "Título";
      case "description":
        return "Descripción";
      default:
        return "";
    }
  }

  setColumnsBySize (): void {
    this.breakpointObserver
      .observe(['(max-width: 959px)'])
      .subscribe(result => {
        this.isSmall = false;
        if (result.matches) {
          this.isSmall = true;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 550px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(min-width: 901px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title', 'description'];
          this.updateDisplayedColumnsTotal();
        }
      });
  }

  updateDisplayedColumnsTotal (): void {
    this.displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  }

  applyFilter (): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  resetTable (): void {
    this.loadRoutines();
    this.search = '';
  }

  addRoutine(): void {
    this.routingService.goToAddRoutine();
  }

  editRoutine(routine: Routine) {
    this.routingService.goToEditRoutine(routine._id);
  }

  deleteRoutine(routine: Routine) {
    this.dialogService.openConfirmDialog('Eliminar rutina', 'Seguro que quieres eliminar ' + routine.title + '?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.routinesService.removeRoutine(routine._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Rutina eliminada con éxito");
            this.loadRoutines();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
        );
      }
    });
  }

  openInfoRoutine(routine: Routine) {
    const dialogRef = this.dialog.open(InfoRoutineComponent, {
      width: '350px',
      data: routine
    });
    dialogRef.afterClosed();
  }

}
