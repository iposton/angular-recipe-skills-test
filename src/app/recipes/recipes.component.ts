import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
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

  constructor(private dataService: DataService, public router: Router,  private route: ActivatedRoute) {
      this.sentNewRecipes = this.dataService.getNewRecipes();
      this.route.params.subscribe( params => {
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
      console.log('new recipes :)') 
      this.recipes = this.sentNewRecipes;
    } 
  }

  public goToThisRecipe(id) {
    if(this.searchTerm != null) {
      this.router.navigateByUrl('/'+this.searchTerm+'/'+id);
    } else {
      this.router.navigateByUrl('/all-recipes/'+id);
    }
  }

}
