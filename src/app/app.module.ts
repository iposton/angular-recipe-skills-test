import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
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

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
