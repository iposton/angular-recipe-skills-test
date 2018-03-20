import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Array <any>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
       this.dataService.getRecipes()
         .subscribe(res => {
      console.log(res['Recipes'], 'recipes');
      this.recipes = res['Recipes'];
    }) 
  }

}
