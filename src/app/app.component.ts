import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: Array <any>;

 constructor(public http: HttpClient, public router: Router,  private route: ActivatedRoute, private dataService: DataService){
   this.route.params.subscribe( params => {
     params['term'] = 'all-recipes';
     console.log(params['term']);
 });
 }
  // public getJSON() {
  //        this.http.get("./assets/recipes.json")
  //          .subscribe(res => {
  //     console.log(res['Recipes'], 'recipes');
  //     this.recipes = res['Recipes'];
  //   }) 

  //             this.http.get("./assets/categories.json")
  //          .subscribe(res => {
  //     console.log(res['Categories'], 'categories');
  //     this.categories = res['Categories'];
  //   }) 
  // }

  //position for tooltip
  position = 'above';

ngOnInit() {

    this.dataService
          .getCategories().subscribe(res => {
             console.log(res['Categories'], 'categories');
             this.categories = res['Categories'];
    }) 
}

 // public goToThisCategory(category) {
 //    this.router.navigateByUrl('/'+category+'/');
 //    //this.loadIdNext(id);

 //  }


}
