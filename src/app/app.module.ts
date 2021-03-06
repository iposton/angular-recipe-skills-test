import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RecipesComponent, EditDialog } from './recipes/recipes.component';
import { HighlightSearchPipe } from './highlight-search.pipe';
import { FilterPipe } from './filter.pipe';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { masterFirebaseConfig } from './api-keys';

import { FirebaseService } from './firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL
};

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
    EditDialog,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, FirebaseService],
  entryComponents: [
    RecipeDialog, EditDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
