import {Component, OnInit} from '@angular/core';
import {FacetType} from "../../models/facet-type";
import {FacetEntity} from "../../models/facet-entity";
import {ElasticService} from "../../services/elastic.service";
import {ActivatedRoute, Data, ParamMap, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {QueryParams} from "../../models/query-params";
import {QueryResult} from "../../models/query-result";
import {Page} from "../../models/page";
import {Field, Sort} from "../../models/sort";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  queryFormControl: FormControl = new FormControl();
  ChipChange = FacetType;

  authors: FacetEntity[];
  onStartAuthors: string[] = [];
  pickedAuthors: string[] = [];

  genres: FacetEntity[];
  onStartGenres: string[] = [];
  pickedGenres: string[] = [];

  albums: FacetEntity[];
  onStartAlbums: string[] = [];
  pickedAlbums: string[] = [];

  minDate: string;
  onStartMinDate: string;
  maxDate: string;
  onStartMaxDate: string;

  queryResults: QueryResult[] = [];
  queryResultsCount: number = 0;

  constructor(private elasticService: ElasticService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qParamMap => this.handleQueryParamMapChange(qParamMap))
    this.route.data.subscribe(data => this.handleDataChange(data));
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
    if(paramMap.has(QueryParams.FROM)){
      this.onStartMinDate= paramMap.get(QueryParams.FROM);
    }
    if(paramMap.has(QueryParams.TO)){
      this.onStartMaxDate= paramMap.get(QueryParams.TO);
    }
  }

  private handleDataChange(data: Data) {
    console.log(data);
    if (data.authors)
      this.authors = data.authors;
    if (data.albums)
      this.albums = data.albums;
    if (data.genres)
      this.genres = data.genres;
    if (data.pagedResults) {
      this.queryResults = data.pagedResults.results;
      this.queryResultsCount = data.pagedResults.total_size;
    }
    if (data.dates) {
      this.minDate = data.dates.min;
      this.maxDate = data.dates.max;
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

/*  updateParamsAndSearch() {  //to jest funkcja jeśli jednak byśmy chcieli manualnie aktualizować wyszukiwanie a nie "onChange".
    const qParams = {};
    qParams[QueryParams.QUERY] = this.queryFormControl.value
    if (this.pickedAlbums.length)
      qParams[QueryParams.ALBUMS] = this.pickedAlbums;
    if (this.pickedGenres.length)
      qParams[QueryParams.GENRES] = this.pickedGenres;
    if (this.pickedAuthors.length)
      qParams[QueryParams.AUTHORS] = this.pickedAuthors;

    return this.changeQueryParams(qParams, '');
  }*/

  onPageChange(pageChange: Page) {
    return this.changeQueryParams(pageChange, 'merge');
  }

  onSortChange(sortChange: Sort) {
    if (sortChange.field === Field.NONE) {
      const qParams = {field: null, direction: null};
      return this.changeQueryParams(qParams, 'merge');
    } else {
      return this.changeQueryParams(sortChange, 'merge');
    }
  }

  onMinDateChange($event: string) {
    if(this.route.snapshot.queryParamMap.get('from') != $event)
      return this.changeQueryParams({from: $event}, 'merge')
  }

  onMaxDateChange($event: string) {
    if(this.route.snapshot.queryParamMap.get('to') != $event)
      return this.changeQueryParams({to: $event}, 'merge')
  }

  private changeQueryParams(newParams: any, strategy: 'merge' | 'preserve' | '') {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: strategy
    })
  }
}
