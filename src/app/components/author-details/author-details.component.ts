import {Component, OnInit} from '@angular/core';
import {QueryResult} from "../../models/query-result";
import {ActivatedRoute, Data, ParamMap, Router} from "@angular/router";
import {Page} from "../../models/page";
import {Field, Sort} from "../../models/sort";

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  queryResults: QueryResult[] = [];
  queryResultsCount: number = 0;

  startOffset: number;
  startPageSize: number;


  constructor(private route: ActivatedRoute, private router: Router) {
    console.log(route.snapshot.data)
    this.queryResults = route.snapshot.data.authorSongs.results;
    this.queryResultsCount = this.queryResults.length;
  }

  ngOnInit(): void {
    this.handleSnapshotParamMap(this.route.snapshot.queryParamMap);
    this.route.data.subscribe(data => this.handleDataChange(data));
  }

  private handleSnapshotParamMap(snapshotParamMap: ParamMap) {
    this.startPageSize = Number(snapshotParamMap.get('size') || 10);
    this.startOffset = Number(snapshotParamMap.get('offset') || 0);
  }

  private handleDataChange(data: Data) {
    if (data.authorSongs) {
      this.queryResults = data.authorSongs.results;
      this.queryResultsCount = data.authorSongs.total_size;
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

  private changeQueryParams(newParams: any, strategy: 'merge' | 'preserve' | '') {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: strategy
    });
  }

}
