import { Component, OnInit } from '@angular/core';
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
  selectedItem: any;

 constructor(public http: HttpClient, public router: Router,  private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog) {}


ngOnInit() {

    this.dataService
          .getCategories().subscribe(res => {
             console.log(res['Categories'], 'categories');
             this.categories = res['Categories'];
             this.categoriesCopy = res['Categories'];
    }) 
}

public goToThisCategory(category) {
    this.selectedItem = category;
    this.router.navigateByUrl('/'+category);
}

//position for tooltip
position = 'above';

  public open(event) {
    this.dialog.open(RecipeDialog, {
      width: '600px',
    });
  }

}

@Component({
  selector: 'recipe-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span style="color:#00aced;">Add New Recipe</span> 
  <mat-dialog-content>
 recipe form here
</mat-dialog-content>`,
})

export class RecipeDialog implements OnInit {
  noPosts: any;
  tweetsData: any;
  constructor(public dialogRef: MatDialogRef <RecipeDialog>) {

  }




  ngOnInit() {
    
  }
}
