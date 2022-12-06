import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '@core/models/recipe';

@Component({
  selector: 'app-info-recipe',
  templateUrl: './info-recipe.component.html',
  styleUrls: ['./info-recipe.component.css']
})
export class InfoRecipeComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly recipe: Recipe
  ) { }

  ngOnInit(): void {
  }

}
