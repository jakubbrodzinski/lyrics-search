import {Component} from '@angular/core';
import {FacetType} from "../../models/facet-type";
import {Observable} from "rxjs";
import {FacetEntity} from "../../models/facet-entity";
import {ElasticService} from "../../services/elastic.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  PARAMS = {
    GENRES: 'genres', QUERY: 'query', AUTHORS: ' authors', ALBUMS: 'albums'
  }
  queryFormControl: FormControl = new FormControl();
  ChipChange = FacetType;

  authors$: Observable<FacetEntity[]>;
  onStartAuthors: string[] = [];
  pickedAuthors: string[] = [];

  genres$: Observable<FacetEntity[]>;
  onStartGenres: string[] = [];
  pickedGenres: string[] = [];

  albums$: Observable<FacetEntity[]>;
  onStartAlbums: string[] = [];
  pickedAlbums: string[] = [];

  constructor(private elasticService: ElasticService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(qParamMap => this.handleQueryParamMapChange(qParamMap))

    this.genres$ = this.elasticService.getFacetGenres();
    this.authors$ = this.elasticService.getFacetAuthors();
    this.albums$ = this.elasticService.getFacetAlbums();
  }

  private handleQueryParamMapChange(paramMap: ParamMap) {
    if (paramMap.has(this.PARAMS.QUERY)) {
      this.queryFormControl.setValue(paramMap.get(this.PARAMS.QUERY))
    }
    if (paramMap.has(this.PARAMS.GENRES)) {
      this.onStartGenres = paramMap.getAll(this.PARAMS.GENRES);
      this.pickedGenres = this.onStartGenres;
    }
    if (paramMap.has(this.PARAMS.AUTHORS)) {
      this.onStartAuthors = paramMap.getAll(this.PARAMS.AUTHORS);
      this.pickedAuthors = this.onStartAuthors;
    }
    if (paramMap.has(this.PARAMS.ALBUMS)) {
      this.onStartAlbums = paramMap.getAll(this.PARAMS.ALBUMS);
      this.pickedAlbums = this.onStartAlbums;
    }
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

  doSomething() {
    const qParams = {};
    qParams[this.PARAMS.QUERY] = this.queryFormControl.value
    if (this.onStartAlbums.length)
      qParams[this.PARAMS.ALBUMS] = this.pickedAlbums;
    if (this.onStartGenres.length)
      qParams[this.PARAMS.GENRES] = this.pickedGenres;
    if (this.onStartAuthors.length)
      qParams[this.PARAMS.AUTHORS] = this.pickedAuthors;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: qParams
    })
  }
}
