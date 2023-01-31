import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RoutineModel } from '@core/models/routine.model';
import { LoaderService } from '@core/services/loader.service';
import { RoutinesService } from '@core/services/routines.service';
import { finalize  } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterService } from '@core/services/router.service';
import { DialogService } from '@core/services/dialog.service';
import { SnackerService } from '@core/services/snacker.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoRoutineComponent } from '@modules/routines/components/info-routine/info-routine.component';

@Component({
  selector: 'app-routines-page',
  templateUrl: './routines-page.component.html',
  styleUrls: ['./routines-page.component.css', '../../../../global/styles/crud.css']
})
export class RoutinesPageComponent implements OnInit {

  listRoutines: RoutineModel[] = [];
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
    private readonly routerService: RouterService
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
    this.routerService.goToAddRoutine();
  }

  editRoutine(routine: RoutineModel) {
    this.routerService.goToEditRoutine(routine._id);
  }

  deleteRoutine(routine: RoutineModel) {
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

  openInfoRoutine(routine: RoutineModel) {
    const dialogRef = this.dialog.open(InfoRoutineComponent, {
      width: '350px',
      data: routine
    });
    dialogRef.afterClosed();
  }

}
