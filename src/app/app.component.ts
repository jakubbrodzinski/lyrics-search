import { Component } from '@angular/core';
import {ElasticService} from "./services/elastic.service";
import {FacetEntity} from "./models/facet-entity";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authors : FacetEntity[];
  authors2 : string[];
  title = 'lyrics-search';

  constructor(private elasticService: ElasticService) {
    this.elasticService.getFacetAuthors()
      .subscribe(x => {
        this.authors2 = x.slice(0,3).map(f=>f.key);
        this.authors = x;
      });
  }

  log(x){
    console.log(x);
  }
}
