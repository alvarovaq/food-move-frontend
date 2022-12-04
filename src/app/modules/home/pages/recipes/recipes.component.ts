import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/core/models/recipe';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { InfoRecipeComponent } from './info-recipe/info-recipe.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackerService } from 'src/app/core/services/snacker.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css', '../../../../shared/styles/crud.css']
})
export class RecipesComponent implements OnInit {

  listRecipes: Recipe[] = [];
  isSmall: boolean = false;
  search: string = '';

  displayedColumns: string[] = ['title', 'description', 'type', 'subtype'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly recipesService: RecipesService,
    private readonly dialogService: DialogService,
    private readonly routingService: RoutingService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.setColumnsBySize();
  }

  loadRecipes (): void {
    this.loaderService.isLoading.next(true);
    this.recipesService.getRecipes()
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.listRecipes = [...res];
        this.dataSource = new MatTableDataSource(this.listRecipes);     
      },
      err => console.log(err)
    );
    this.dataSource = new MatTableDataSource(this.listRecipes);
  }

  getTitleColumn (column: string): string {
    switch (column) {
      case "title":
        return "Título";
      case "description":
        return "Descripción";
      case "type":
        return "Tipo de Comida";
      case "subtype":
        return "Plato";
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
      .observe(['(max-width: 900px)', '(min-width:651px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title', 'description', 'type'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 650px)','(min-width:551px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title', 'description'];
          this.updateDisplayedColumnsTotal();
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
          this.displayedColumns = ['title', 'description', 'type', 'subtype'];
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
    this.loadRecipes();
    this.search = '';
  }

  addRecipe (): void {
    this.routingService.goToAddRecipe();
  }

  editRecipe (recipe: Recipe): void {
    this.routingService.goToEditRecipe(recipe._id);
  }

  deleteRecipe (recipe: Recipe): void {
    this.dialogService.openConfirmDialog('Eliminar receta', 'Seguro que quieres eliminar ' + recipe.title + '?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.recipesService.removeRecipe(recipe._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Receta eliminada con éxito");
            this.loadRecipes();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
        );
      }
    });
  }

  openInfoRecipe (recipe: Recipe): void {
    const dialogRef = this.dialog.open(InfoRecipeComponent, {
      width: '350px',
      data: recipe
    });
    dialogRef.afterClosed();
  }

}
