import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Array <any>;
  sentNewRecipes: Array <any>;
  searchTerm: string = '';

  constructor(private dataService: DataService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.sentNewRecipes = this.dataService.getNewRecipes();
    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
    });
  }

  ngOnInit() {

    if (this.sentNewRecipes === undefined) {

      this.dataService.getRecipes()
        .subscribe(res => {
          console.log(res['Recipes'], 'recipes');
          this.recipes = res['Recipes'];
        })

    } else {
      this.recipes = this.sentNewRecipes;
    }
  }

  public goToThisRecipe(id) {
    if (this.searchTerm != null) {
      this.router.navigateByUrl('/' + this.searchTerm + '/' + id);
    } else {
      this.router.navigateByUrl('/all-recipes/' + id);
    }
  }

  public open(event, data) {
    this.dialog.open(EditDialog, {
      data: data,
      width: '320px',
    })

  }

  public delete(data) {
    var result = confirm("delete " + data.title + " recipe?");
    if (result) {
      let i;
      this.recipes.forEach((item, index) => {
        i = index;
        if (this.recipes[i].id === data.id) {
          this.recipes.splice(i, 1);
        }
      })

    }
  }

}

@Component({
  selector: 'edit-dialog',
  template: `
        <i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
        <span>Edit Recipe</span>

        <form #formCtrl="ngForm" *ngIf="newRecipes != null">
          <mat-dialog-content>
            <mat-form-field>
              <input matInput name="title" type="text" class="form-control" placeholder="Add Title" [(ngModel)]="newRecipes[recipeIndex].title" required>
            </mat-form-field>
            <mat-form-field>
              <mat-select name="category" placeholder="Choose Category" [(value)]="newRecipes[recipeIndex].category" required>
                <mat-option *ngFor="let cat of categories" [value]="cat.category">
                  {{ cat.category }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <input matInput name="desc" type="text" class="form-control" placeholder="Add Description" [(ngModel)]="newRecipes[recipeIndex].desc" required>
            </mat-form-field>
            <mat-form-field>
              <input matInput name="image" type="text" class="form-control" placeholder="Add Image Link" [(ngModel)]="newRecipes[recipeIndex].image" required>
            </mat-form-field>
          </mat-dialog-content>
          <div>
            <span><button mat-raised-button (click)="updateRecipe()"  [disabled]="!formCtrl.form.valid">Update Recipe</button></span> <span><button mat-raised-button (click)="dialogRef.close()">Cancel</button></span>
          </div>
        </form>`,
})

export class EditDialog implements OnInit {

  recipe: any;
  categories: Array <any> ;
  recipes: Array <any> ;
  newRecipes: Array <any> ;
  sentNewRecipes: any;
  recipeIndex: any;

  constructor(public dialogRef: MatDialogRef <EditDialog> , @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, public router: Router) {

    this.recipe = this.data;
    this.sentNewRecipes = this.dataService.getNewRecipes();
    console.log(this.sentNewRecipes, 'Recipes');
    this.dataService.getCategories()
      .subscribe(res => {
        console.log(res['Categories'], 'Categories');
        this.categories = res['Categories'];
      })


  }

  public updateRecipe() {
    console.log(this.newRecipes[this.recipe.id], 'recipe updated');

    this.dataService
      .sendNewRecipes(this.newRecipes);

    this.router.navigateByUrl('/' + this.newRecipes[this.recipeIndex].category);
    this.dialogRef.close();

  }

  ngOnInit() {

    if (this.sentNewRecipes === undefined) {
      console.log('sentNewRecipes not ready')
      this.dataService.getRecipes()
        .subscribe(res => {
          console.log(res['Recipes'], 'recipes');
          this.newRecipes = res['Recipes'];
        })

      let i;
      this.newRecipes.forEach((item, index) => {
        i = index;
        if (this.newRecipes[i].id === this.recipe.id) {
          this.recipeIndex = i;
        }
      })

    } else {
      this.newRecipes = this.sentNewRecipes;
      let i;
      this.newRecipes.forEach((item, index) => {
        i = index;
        if (this.newRecipes[i].id === this.recipe.id) {
          this.recipeIndex = i;
        }
      })
    }

  }
}
