import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {QueryResult} from "../../models/query-result";
import {Page} from "../../models/page";
import {Direction, Field, Sort} from "../../models/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit, OnChanges {
  FieldSort = Field;
  @Input()
  queryResults: QueryResult[];
  @Input()
  startOffset: number;
  @Input()
  startSize: number;

  @Input()
  totalSize: number;

  @Output()
  pagingEvent = new EventEmitter<Page>();

  @Output()
  sortingEvent = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  currentSort: Sort = {
    field: Field.SCORE,
    direction: Direction.DESC
  };

  pageSize: number = 10;
  currentPage: number = 0;
  possiblePages: number[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalSize || changes.startSize || changes.startOffset) {
      this.pageSize = this.startSize || 10;
      this.currentPage = (this.startOffset / this.pageSize) || 0;
      this.recalculatePages();
    }
  }

  private recalculatePages() {
    let pages = [];
    for (let p = 0; p < this.totalSize / this.pageSize; p++) {
      pages.push(p);
    }
    this.possiblePages = pages;
  }

  ngOnInit(): void {
  }

  sortBy(field: Field) {
    if (this.currentSort.field !== field) {
      this.currentSort.field = field;
      this.currentSort.direction = Direction.ASC;
    } else if (this.currentSort.direction === Direction.ASC) {
      this.currentSort.direction = Direction.DESC;
    } else {
      this.currentSort.field = Field.NONE;
    }
    this.sortingEvent.emit(this.currentSort);
  }

  changePageSize(size: number) {
    if (this.pageSize !== size) {
      this.pageSize = size;
      this.pagingEvent.emit({size: this.pageSize, offset: 0});
      this.recalculatePages();
    }
  }

  changePage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.pagingEvent.emit({size: this.pageSize, offset: page * this.pageSize});
    }
  }

  handlePage(event: PageEvent) {
    this.changePageSize(event.pageSize);
    this.changePage(event.pageIndex);
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);

    this.handlePage(event);
  }

  getTotalSize() {
    return this.totalSize;
  }

}
