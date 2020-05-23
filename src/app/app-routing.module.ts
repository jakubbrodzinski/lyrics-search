import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleSearchComponent} from "./components/simple-search/simple-search.component";
import {AdvancedSearchComponent} from "./components/advanced-search/advanced-search.component";
import {AdvancedSearchResolver} from "./resolvers/advanced-search-resolver";
import {AuthorsResolver} from "./resolvers/authors-resolver";
import {AlbumsResolver} from "./resolvers/albums-resolver";
import {GenresResolver} from "./resolvers/genres-resolver";
import {DateResolver} from "./resolvers/date-resolver";
import {SongDetailsComponent} from "./components/song-details/song-details.component";
import {SongDetailsResolver} from "./resolvers/song-details-resolver";


const routes: Routes = [
  {path: '', pathMatch: 'full', component: SimpleSearchComponent},
  {
    path: 'search',
    component: AdvancedSearchComponent,
    resolve: {
      pagedResults: AdvancedSearchResolver,
      authors: AuthorsResolver,
      albums: AlbumsResolver,
      genres: GenresResolver,
      dates: DateResolver
    },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: 'song/:song_id',
    component: SongDetailsComponent,
    resolve: {
      song: SongDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
