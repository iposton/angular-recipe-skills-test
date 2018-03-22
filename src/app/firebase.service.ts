import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  items: any;
  categories: any;


  constructor(public af: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.items = af.list('/Recipes').valueChanges(); 
    this.categories = af.list('/Categories').valueChanges();
     
  }

  addData(recipe) {
    this.af.list('/Recipes').push(recipe).then(_ => console.log('new recipe added!')); 
  }

  getRecipes() {
    console.log('getting recipes from firebase...');
    return this.items = this.af.list('/Recipes').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }



  getCategories() {
    console.log('getting categories from firebase...');
    return this.categories = this.af.list('/Categories').valueChanges();
  }

  updateRecipe(recipe) {
 
    this.af.list('/Recipes/')
      .update(recipe.key, { 
        category: recipe.category,
        desc: recipe.desc,
        id: recipe.id,
        image: recipe.image,
        title: recipe.title
      }).then(_ => console.log('updated recipe!'));

  }

  deleteRecipe(key) {
     this.af.list('/Recipes')
       .remove(key).then(_ => console.log('destroyed recipe!'));
  }

}