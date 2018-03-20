import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

 constructor(public http: HttpClient, public router: Router,  private route: ActivatedRoute, private dataService: DataService) {}


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
    //this.loadIdNext(id);

}

//position for tooltip
position = 'above';

}
