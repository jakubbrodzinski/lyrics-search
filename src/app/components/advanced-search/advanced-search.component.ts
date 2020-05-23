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
  startFromDate: string;
  fromDate: string;
  maxDate: string;
  startToDate: string;
  toDate: string;

  queryResults: QueryResult[] = [];
  queryResultsCount: number = 0;

  startOffset: number;
  startPageSize: number;

  constructor(private elasticService: ElasticService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.handleSnapshotParamMap(this.route.snapshot.queryParamMap);
    this.route.data.subscribe(data => this.handleDataChange(data));
  }

  private handleSnapshotParamMap(snapshotParamMap: ParamMap) {
    if (snapshotParamMap.has(QueryParams.QUERY)) {
      this.queryFormControl.setValue(snapshotParamMap.get(QueryParams.QUERY))
    }
    if (snapshotParamMap.has(QueryParams.GENRES)) {
      this.onStartGenres = snapshotParamMap.getAll(QueryParams.GENRES);
      this.pickedGenres = this.onStartGenres;
    }
    if (snapshotParamMap.has(QueryParams.AUTHORS)) {
      this.onStartAuthors = snapshotParamMap.getAll(QueryParams.AUTHORS);
      this.pickedAuthors = this.onStartAuthors;
    }
    if (snapshotParamMap.has(QueryParams.ALBUMS)) {
      this.onStartAlbums = snapshotParamMap.getAll(QueryParams.ALBUMS);
      this.pickedAlbums = this.onStartAlbums;
    }
    this.startPageSize = Number(snapshotParamMap.get('size') || 10);
    this.startOffset = Number(snapshotParamMap.get('offset') || 0);
    if (snapshotParamMap.has('from')) {
      this.startFromDate = snapshotParamMap.get('from');
    }
    if (snapshotParamMap.has('to')) {
      this.startToDate = snapshotParamMap.get('to');
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

  updateParamsAndSearch() {
    const searchParams = {};
    searchParams[QueryParams.QUERY] = this.queryFormControl.value;
    if (this.pickedAlbums.length > 0)
      searchParams[QueryParams.ALBUMS] = this.pickedAlbums;
    if (this.pickedAuthors.length > 0)
      searchParams[QueryParams.AUTHORS] = this.pickedAuthors;
    if (this.pickedGenres.length > 0)
      searchParams[QueryParams.GENRES] = this.pickedGenres;
    if (this.fromDate)
      searchParams[QueryParams.FROM] = this.fromDate;
    if (this.toDate)
      searchParams[QueryParams.TO] = this.toDate;

    return this.changeQueryParams(searchParams, 'merge');
  }


  chipsChanges($event: string[], type: FacetType) {
    let key: QueryParams;
    switch (type) {
      case FacetType.GENRES:
        this.pickedGenres = $event;
        key = QueryParams.GENRES;
        break;
      case FacetType.AUTHORS:
        this.pickedAuthors = $event;
        key = QueryParams.AUTHORS;
        break;
      case FacetType.ALBUMS:
        this.pickedAlbums = $event;
        key = QueryParams.ALBUMS;
        break;
    }
  }

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
    this.fromDate = $event;
  }

  onMaxDateChange($event: string) {
    this.toDate = $event;
  }

  private changeQueryParams(newParams: any, strategy: 'merge' | 'preserve' | '') {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: strategy
    })
  }
}
