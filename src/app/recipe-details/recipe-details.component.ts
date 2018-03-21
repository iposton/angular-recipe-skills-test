import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
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

  constructor(private dataService: DataService, public router: Router, private route: ActivatedRoute) {
    this.sentNewRecipes = this.dataService.getNewRecipes();
    this.route.params.subscribe(params => {
      this.recipeID = params.id;
    });
  }

  public loadRecipe(recipes) {

    if (recipes != null) {
      console.log(recipes, 'trying to load recipe to view...')
      for (let rec of recipes) {
        if (rec.id == this.recipeID) {
          console.log(rec, 'this is the selected recipe...');
          this.selectedRecipe = rec;

        }
      }
    }
  }

  ngOnInit() {

    if (this.sentNewRecipes === undefined) {
      this.dataService.getRecipes()
        .subscribe(res => {
          console.log(res['Recipes'], 'recipes');
          this.recipes = res['Recipes'];
          this.loadRecipe(this.recipes);
        })

    } else {
      this.recipes = this.sentNewRecipes;
      this.loadRecipe(this.recipes);
    }

   
  }

}
