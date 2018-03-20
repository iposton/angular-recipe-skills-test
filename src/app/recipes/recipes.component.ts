import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Array <any>;
  searchTerm: string = '';
  constructor(private dataService: DataService, public router: Router,  private route: ActivatedRoute,) {

      this.route.params.subscribe( params => {
       this.searchTerm = params['term'];
      });

   }

  ngOnInit() {
       this.dataService.getRecipes()
         .subscribe(res => {
      console.log(res['Recipes'], 'recipes');
      this.recipes = res['Recipes'];
    }) 
  }

}
