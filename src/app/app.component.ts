import {Component} from '@angular/core';
import {ElasticService} from "./services/elastic.service";
import {FacetEntity} from "./models/facet-entity";
import {Observable} from "rxjs";
import {FacetType} from "./models/facet-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ChipChange = FacetType;

  authors$: Observable<FacetEntity[]>;
  pickedAuthors: string[] = [];

  genres$: Observable<FacetEntity[]>;
  pickedGenres: string[] = [];

  albums$: Observable<FacetEntity[]>;
  pickedAlbums: string[] = [];

  constructor(private elasticService: ElasticService) {
    this.genres$ = this.elasticService.getFacetGenres();
    this.authors$ = this.elasticService.getFacetAuthors();
    this.albums$ = this.elasticService.getFacetAlbums();
  }

  chipsChanges($event: string[], type: FacetType) {
    switch (type) {
      case FacetType.GENRES:
        this.pickedGenres = $event;
        break;
      case FacetType.AUTHORS:
        this.pickedAuthors = $event;
        break;
      case FacetType.ALBUMS:
        this.pickedAlbums = $event;
        break;
    }
  }

  log(x) {
    console.log(x);
  }
}
