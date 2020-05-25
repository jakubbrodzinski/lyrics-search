import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvancedSearchComponent} from "./components/advanced-search/advanced-search.component";
import {AdvancedSearchResolver} from "./resolvers/advanced-search-resolver";
import {AuthorsResolver} from "./resolvers/authors-resolver";
import {AlbumsResolver} from "./resolvers/albums-resolver";
import {GenresResolver} from "./resolvers/genres-resolver";
import {DateResolver} from "./resolvers/date-resolver";
import {SongDetailsComponent} from "./components/song-details/song-details.component";
import {SongDetailsResolver} from "./resolvers/song-details-resolver";
import {AlbumDetailsComponent} from "./components/album-details/album-details.component";
import {AuthorDetailsComponent} from "./components/author-details/author-details.component";
import {HomePageComponent} from "./components/home-page/home-page.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
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
  },
  {
    path: 'album',
    component: AlbumDetailsComponent,
    resolve: {
      albumSongs: AdvancedSearchResolver
    },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: 'author',
    component: AuthorDetailsComponent,
    resolve: {
      authorSongs: AdvancedSearchResolver
    },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
