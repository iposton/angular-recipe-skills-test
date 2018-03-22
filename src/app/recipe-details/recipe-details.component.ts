import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  selectedRecipe: Observable <any> = null;
  recipeID: any;
  recipes: Array <any>;
  sentNewRecipes: Array <any>;

  constructor(private dataService: DataService, public router: Router, private route: ActivatedRoute, private fbService: FirebaseService) {
    // this.sentNewRecipes = this.dataService.getNewRecipes();
    this.route.params.subscribe(params => {
      this.recipeID = params.id;
    });
  }

  public loadRecipe(recipes) {

    if (recipes != null) {
     
      for (let rec of recipes) {
        if (rec.id == this.recipeID) {
          console.log(rec, 'this is the selected recipe...');
          this.selectedRecipe = rec;

        }
      }
    }
  }

  ngOnInit() {
    this.fbService.getRecipes()
      .subscribe(res => {
        console.log(res, 'recipes');
        this.recipes = res;
        this.loadRecipe(this.recipes);
      })
  }

}
