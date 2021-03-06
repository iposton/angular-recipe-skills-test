import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

let sendingNewRecipes;
let sentRecipes;


@Injectable()
export class DataService {

  recipes: Observable < any > = null;
  categories: Observable < any > = null;
  

  constructor(public http: HttpClient) {}

   sendNewRecipes(newRecipesArray) {
      console.log("sending new recipes to service...");
      sendingNewRecipes = newRecipesArray;
      
   }

   getNewRecipes() {
      console.log("new recipes sent to component...");
      sentRecipes = sendingNewRecipes;
      return sentRecipes;
   }


   getRecipes() {
    
    if (!this.recipes) {
      console.log('getting recipes...');
      this.recipes = this.http.get("./assets/recipes.json")
        
    }
    return this.recipes;

  }

   getCategories() {
    
    if (!this.categories) {
      console.log('getting categories...');
      this.categories = this.http.get("./assets/categories.json")
        
    }
    return this.categories;

  }

}
