import {Component, OnInit} from '@angular/core';
import {FacetType} from "../../models/facet-type";
import {Observable} from "rxjs";
import {FacetEntity} from "../../models/facet-entity";
import {ElasticService} from "../../services/elastic.service";
import {ActivatedRoute, Data, ParamMap, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {QueryParams} from "../../models/query-params";
import {filter, map} from "rxjs/operators";
import {QueryResult} from "../../models/query-result";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
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

  queryResults: QueryResult[] = [];

  constructor(private elasticService: ElasticService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qParamMap => this.handleQueryParamMapChange(qParamMap))
    this.route.data.pipe(
      filter<Data>(data => data['queryResults']),
      map<Data, QueryResult[]>(data => data['queryResults'])
    ).subscribe(qResults => {
      this.queryResults = qResults;
    });

    this.genres$ = this.elasticService.getFacetGenres();
    this.authors$ = this.elasticService.getFacetAuthors();
    this.albums$ = this.elasticService.getFacetAlbums();
  }

  private handleQueryParamMapChange(paramMap: ParamMap) {
    if (paramMap.has(QueryParams.QUERY)) {
      this.queryFormControl.setValue(paramMap.get(QueryParams.QUERY))
    }
    if (paramMap.has(QueryParams.GENRES)) {
      this.onStartGenres = paramMap.getAll(QueryParams.GENRES);
      this.pickedGenres = this.onStartGenres;
    }
    if (paramMap.has(QueryParams.AUTHORS)) {
      this.onStartAuthors = paramMap.getAll(QueryParams.AUTHORS);
      this.pickedAuthors = this.onStartAuthors;
    }
    if (paramMap.has(QueryParams.ALBUMS)) {
      this.onStartAlbums = paramMap.getAll(QueryParams.ALBUMS);
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
    qParams[QueryParams.QUERY] = this.queryFormControl.value
    if (this.pickedAlbums.length)
      qParams[QueryParams.ALBUMS] = this.pickedAlbums;
    if (this.pickedGenres.length)
      qParams[QueryParams.GENRES] = this.pickedGenres;
    if (this.pickedAuthors.length)
      qParams[QueryParams.AUTHORS] = this.pickedAuthors;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: qParams
    })
  }
}
