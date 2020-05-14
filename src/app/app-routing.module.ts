import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleSearchComponent} from "./components/simple-search/simple-search.component";
import {AdvancedSearchComponent} from "./components/advanced-search/advanced-search.component";
import {AdvancedSearchResolver} from "./resolvers/advanced-search-resolver";


const routes: Routes = [
  {path: '', pathMatch: 'full', component: SimpleSearchComponent},
  {
    path: 'search',
    component: AdvancedSearchComponent,
    resolve: {queryResults: AdvancedSearchResolver},
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
