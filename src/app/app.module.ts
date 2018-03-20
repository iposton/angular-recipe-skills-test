import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule, 
        MatGridListModule, 
        MatToolbarModule, 
        MatSnackBarModule, 
        MatButtonModule, 
        MatTabsModule, 
        MatMenuModule,
        MatListModule,
        MatInputModule,
        MatChipsModule,
        MatTooltipModule,
        MatDialogModule,
        MatSelectModule,
        MatProgressSpinnerModule, 
        MatSidenavModule } from '@angular/material';

import { DataService } from './data.service';
import { AppComponent, RecipeDialog } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HighlightSearchPipe } from './highlight-search.pipe';
import { FilterPipe } from './filter.pipe';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
 {
        path: '',
        redirectTo: 'all-recipes',
        pathMatch: 'full'
 },
 { 
        path: 'all-recipes', 
        component: RecipesComponent 
 },
 { 
        path: 'all-recipes/:id', 
        component: RecipeDetailsComponent 
 },
 { 
        path: ':term', 
        component: RecipesComponent 
 },
 { 
        path: ':term/:id', 
        component: RecipeDetailsComponent 
 }
 
];


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HighlightSearchPipe,
    FilterPipe,
    RecipeDialog,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule, 
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  entryComponents: [
    RecipeDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
