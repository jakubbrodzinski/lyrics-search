import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { FacetChipsPickerComponent } from './components/facet-chips-picker/facet-chips-picker.component';
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { SimpleSearchComponent } from './components/simple-search/simple-search.component';
import {AdvancedSearchResolver} from "./resolvers/advanced-search-resolver";

@NgModule({
  declarations: [
    AppComponent,
    FacetChipsPickerComponent,
    AdvancedSearchComponent,
    SimpleSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [AdvancedSearchResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
