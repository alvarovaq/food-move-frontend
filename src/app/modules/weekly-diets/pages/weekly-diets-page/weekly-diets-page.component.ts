import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WeeklyDietsService } from '@core/services/weekly-diets.service';
import { TableStructure } from '@shared/components/table/interfaces/table-structure';
import { finalize } from 'rxjs';
import { DEFAULT_LIMIT } from 'src/app/constants/app.constants';
import { WeeklyDietModel } from '@core/models/weekly-diet';
import { MatDialog } from '@angular/material/dialog';
import { AddWeeklyDietComponent } from '@modules/weekly-diets/components/add-weekly-diet/add-weekly-diet.component';
import { SnackerService } from '@core/services/snacker.service';
import { LoaderService } from '@core/services/loader.service';
import { DialogService } from '@core/services/dialog.service';
import { RouterService } from '@core/services/router.service';
import { DayOfWeek } from '@core/enums/day-of-week';

@Component({
  selector: 'app-weekly-diets-page',
  templateUrl: './weekly-diets-page.component.html',
  styleUrls: ['./weekly-diets-page.component.css', '../../../../../assets/styles/crud.css']
})
export class WeeklyDietsPageComponent implements OnInit {

  listWeeklyDiets: WeeklyDietModel[] = [];
  isSmall: boolean = false;
  isLoadingResults: boolean = false;
  
  dataSource!: MatTableDataSource<any>;

  tableStructure: TableStructure[] = [
    {index: 1, field: 'title', header: 'Título', sort: true},
    {index: 2, field: 'description', header: 'Descripción', sort: true}
  ];
  indexDisplay: number = 2;

  search: string = '';
  searchFields: string[] = ['title'];

  sortField: string = "title";
  sortDirection: string = 'asc';

  limit = DEFAULT_LIMIT;
  page = 0;
  total = 0;

  constructor(
    private readonly weeklyDietsService: WeeklyDietsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly dialogService: DialogService,
    private readonly routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.loadWeeklyDiets();
    this.setColumnsBySize();
  }

  loadWeeklyDiets (): void {
    this.isLoadingResults = true;
    this.weeklyDietsService.filter({
      paging: {
        page: this.page + 1,
        limit: this.limit
      },
      sorting: [{field: this.sortField, direction: this.sortDirection}],
      search: {search: this.search, fields: this.searchFields},
      filter: {}
    })
    .pipe(finalize(() => {
      this.isLoadingResults = false;
    }))
    .subscribe(
      res => {
        this.total = res.total;
        this.listWeeklyDiets = [...res.items];
        this.dataSource = new MatTableDataSource(this.listWeeklyDiets);     
      },
      err => console.log(err)
    );
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
          this.indexDisplay = 1;
        }
      });
    this.breakpointObserver
      .observe(['(min-width: 901px)'])
      .subscribe(result => {
        if (result.matches) {
          this.indexDisplay = 2;
        }
      });
  }

  changeSort (sort: Sort) {
    this.sortDirection = sort.direction;
    this.sortField = sort.active;
    this.page = 0;
    this.loadWeeklyDiets();
  }

  changePage (e: PageEvent) {
    this.page = e.pageIndex;
    this.loadWeeklyDiets();
  }

  applyFilter(): void {
    this.page = 0;
    this.loadWeeklyDiets();
  }

  resetTable (): void {
    this.search = '';
    this.page = 0;
    this.loadWeeklyDiets();
  }

  addWeeklyDiet(): void {
    const dialogRef = this.dialog.open(AddWeeklyDietComponent, {
      width: '400px'
    });
    dialogRef.afterClosed();
  }

  editWeeklyDiet(weeklyDiet: WeeklyDietModel) {
    this.routerService.goToEditWeeklyDiet(weeklyDiet._id);
  }

  deleteWeeklyDiet(weeklyDiet: WeeklyDietModel) {
    this.dialogService.openConfirmDialog('Eliminar dieta semanal', 'Seguro que quieres eliminar ' + weeklyDiet.title + '?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.weeklyDietsService.removeWeeklyDiet(weeklyDiet._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Dieta semanal eliminada con éxito");
            this.loadWeeklyDiets();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
        );
      }
    });
  }

  openInfoWeeklyDiet(weeklyDiet: WeeklyDietModel) {}

}
