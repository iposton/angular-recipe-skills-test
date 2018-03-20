import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from './data.service';
import { HighlightSearchPipe } from './highlight-search.pipe';
import { FilterPipe } from './filter.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: Array <any>;
  categoriesCopy: Array <any>;
  searchTerm: string = '';
  selectedCategory: any;
  
 constructor(public http: HttpClient, public router: Router,  private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog) {

    
   
 }


ngOnInit() {

    this.dataService
          .getCategories().subscribe(res => {
             console.log(res['Categories'], 'categories');
             this.categories = res['Categories'];
             this.categoriesCopy = res['Categories'];
    }) 

   
}

public goToThisCategory(category) {
    //this.selectedItem = category;
    this.router.navigateByUrl('/'+category);
}


public onSelect(category) { 

  //this.dataService.selectedCategory = category; 
  this.selectedCategory = category;

}

public goToAllRecipes() { 
    this.selectedCategory = '';
    this.router.navigateByUrl('/all-recipes');
}

//position for tooltip
position = 'above';

  public open(event, categories) {
 
    this.dialog.open(RecipeDialog, {
      data: categories,
      width: '320px',
    }).afterClosed()
    .subscribe(category => {
     
      this.selectedCategory = category;
  });
  }

}

@Component({
  selector: 'recipe-dialog',
  template: `
        <i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
        <span>Add New Recipe</span>

        <form #formCtrl="ngForm">
          <mat-dialog-content>
            <mat-form-field>
              <input matInput name="title" type="text" class="form-control" placeholder="Add Title" [(ngModel)]="newRecipe.title" required>
            </mat-form-field>
            <mat-form-field>
              <mat-select name="category" placeholder="Choose Category" [(value)]="newRecipe.category" required>
                <mat-option *ngFor="let cat of categories" [value]="cat.category">
                  {{ cat.category }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <input matInput name="desc" type="text" class="form-control" placeholder="Add Description" [(ngModel)]="newRecipe.desc" required>
            </mat-form-field>
            <button>Choose File</button> No file chosen
          </mat-dialog-content>
          <div>
            <span><button mat-raised-button (click)="addRecipe()"  [disabled]="!formCtrl.form.valid">Add Recipe</button></span> <span><button mat-raised-button (click)="dialogRef.close()">Cancel</button></span>
          </div>
        </form>`,
})

export class RecipeDialog implements OnInit {
  newRecipes: Array <any>;
  categories: Array <any>;
  

  // recipe model
  newRecipe = {
      title: '',
      desc: '',
      category: 'all-recipes',
      image: '../assets/images/recipe-logo.jpeg'   
  };

  constructor(public dialogRef: MatDialogRef <RecipeDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService,  public router: Router) {
        // categories passed into dialog for mat-select menu
        this.categories = this.data;
        
         this.dataService.getRecipes()
         .subscribe(res => {
          console.log(res['Recipes'], 'recipes');
          this.newRecipes = res['Recipes'];
        })
   }

 public addRecipe() {
    this.newRecipes.push(this.newRecipe);
    console.log(this.newRecipe, 'recipe created');
    
    this.dataService
          .sendNewRecipes(this.newRecipes);

    this.router.navigateByUrl('/'+this.newRecipe.category);
    this.dialogRef.close(this.newRecipe.category);

 }



  ngOnInit() {

  }
}
