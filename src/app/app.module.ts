import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FacetChipsPickerComponent} from './components/facet-chips-picker/facet-chips-picker.component';
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AdvancedSearchComponent} from './components/advanced-search/advanced-search.component';
import {SimpleSearchComponent} from './components/simple-search/simple-search.component';
import {AdvancedSearchResolver} from "./resolvers/advanced-search-resolver";
import {AlbumsResolver} from "./resolvers/albums-resolver";
import {AuthorsResolver} from "./resolvers/authors-resolver";
import {GenresResolver} from "./resolvers/genres-resolver";
import {ResultsListComponent} from './components/results-list/results-list.component';
import {DateResolver} from "./resolvers/date-resolver";
import {DateFacetComponent} from './components/date-facet/date-facet.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {ResultsListElementComponent} from './components/results-list-element/results-list-element.component';
import {SongDetailsComponent} from './components/song-details/song-details.component';
import {SongDetailsResolver} from "./resolvers/song-details-resolver";
import {AlbumDetailsComponent} from './components/album-details/album-details.component';
import {AuthorDetailsComponent} from './components/author-details/author-details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FacetChipsPickerComponent,
    AdvancedSearchComponent,
    SimpleSearchComponent,
    ResultsListComponent,
    DateFacetComponent,
    SongDetailsComponent,
    ResultsListElementComponent,
    AlbumDetailsComponent,
    AuthorDetailsComponent,
    HomePageComponent
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
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  providers: [AdvancedSearchResolver, AlbumsResolver, AuthorsResolver, GenresResolver, DateResolver, SongDetailsResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
