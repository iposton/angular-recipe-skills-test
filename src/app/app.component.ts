import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // recipe model

  // recipe = {
    // id: 0,
    // title: 'cooked eggs',
    // desc: 'crack the eggs and cook them.',
    // category: 'breakfast'
  // }

  recipes: Array <any>;
  categories: Array <any>;

 constructor(public http: HttpClient){}
  public getJSON() {
         this.http.get("./assets/recipes.json")
           .subscribe(res => {
      console.log(res['Recipes'], 'recipes');
      this.recipes = res['Recipes'];
    }) 

              this.http.get("./assets/categories.json")
           .subscribe(res => {
      console.log(res['Categories'], 'categories');
      this.categories = res['Categories'];
    }) 
  }


  title = 'app';

  //position for tooltip
  position = 'above';

ngOnInit() {
  this.getJSON();
}


}
