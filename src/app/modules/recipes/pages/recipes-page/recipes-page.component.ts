import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RecipesService } from '@core/services/recipes.service';
import { RouterService } from '@core/services/router.service';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { SnackerService } from '@core/services/snacker.service';
import { InfoRecipeComponent } from '@modules/recipes/components/info-recipe/info-recipe.component';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css', '../../../../global/styles/crud.css']
})
export class RecipesPageComponent implements OnInit {

  listRecipes: RecipeModel[] = [];
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
    private readonly routerService: RouterService,
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
    this.routerService.goToAddRecipe();
  }

  editRecipe (recipe: RecipeModel): void {
    this.routerService.goToEditRecipe(recipe._id);
  }

  deleteRecipe (recipe: RecipeModel): void {
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

  openInfoRecipe (recipe: RecipeModel): void {
    const dialogRef = this.dialog.open(InfoRecipeComponent, {
      width: '350px',
      data: recipe
    });
    dialogRef.afterClosed();
  }

}
