import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeModel } from '@core/models/recipe.model';

@Component({
  selector: 'app-info-recipe',
  templateUrl: './info-recipe.component.html',
  styleUrls: ['./info-recipe.component.css', '../../../../global/styles/info-dialog.css']
})
export class InfoRecipeComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly recipe: RecipeModel
  ) { }

  ngOnInit(): void {
  }

}
